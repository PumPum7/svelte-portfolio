import type { APIRoute } from 'astro';
import { contactSchema } from '../../lib/validation';

export const prerender = false;

const MIN_FORM_FILL_MS = 2500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const recentSubmissions = new Map<string, number[]>();

function jsonResponse(body: Record<string, string | boolean>, status: number) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' }
	});
}

function getClientIdentifier(request: Request) {
	const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
	return (
		forwardedFor ||
		request.headers.get('x-real-ip') ||
		request.headers.get('cf-connecting-ip') ||
		'unknown'
	);
}

function isRateLimited(identifier: string) {
	const now = Date.now();
	const timestamps = (recentSubmissions.get(identifier) || []).filter(
		(timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
	);

	if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
		recentSubmissions.set(identifier, timestamps);
		return true;
	}

	timestamps.push(now);
	recentSubmissions.set(identifier, timestamps);
	return false;
}

function looksRandomToken(value: string) {
	const token = value.trim();
	if (token.length < 12 || /\s/.test(token)) {
		return false;
	}

	const lettersOnly = token.replace(/[^a-z]/gi, '');
	if (lettersOnly.length < Math.floor(token.length * 0.8)) {
		return false;
	}

	const vowelRatio = (lettersOnly.match(/[aeiouy]/gi) || []).length / lettersOnly.length;
	const uniqueCharRatio = new Set(lettersOnly.toLowerCase()).size / lettersOnly.length;
	const hasMixedCase = /[a-z]/.test(token) && /[A-Z]/.test(token);

	return hasMixedCase && vowelRatio < 0.38 && uniqueCharRatio > 0.45;
}

function isSuspiciousSubmission(name: string, email: string, subject: string, message: string) {
	const emailLocalPart = email.split('@')[0] || '';
	const suspiciousFields = [name, emailLocalPart, subject, message].filter(looksRandomToken).length;
	const compactSubject = subject.trim();
	const compactMessage = message.trim();
	const longSingleTokenContent =
		compactSubject.length >= 12 &&
		compactMessage.length >= 12 &&
		!/\s/.test(compactSubject) &&
		!/\s/.test(compactMessage);

	return suspiciousFields >= 3 || (suspiciousFields >= 2 && longSingleTokenContent);
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const data = await request.json();
		const validationResult = contactSchema.safeParse(data);

		if (!validationResult.success) {
			return jsonResponse({ success: false, error: validationResult.error.issues[0].message }, 400);
		}

		const { name, email, subject, message, captchaSolution, website, submittedAt } =
			validationResult.data;
		const clientIdentifier = getClientIdentifier(request);

		if (website) {
			return jsonResponse({ success: false, error: 'Spam detected' }, 400);
		}

		const elapsedMs = Date.now() - submittedAt;
		if (elapsedMs < MIN_FORM_FILL_MS || elapsedMs < -60_000) {
			return jsonResponse({ success: false, error: 'Submission rejected' }, 400);
		}

		if (isRateLimited(clientIdentifier)) {
			return jsonResponse(
				{ success: false, error: 'Too many attempts. Please try again later.' },
				429
			);
		}

		if (isSuspiciousSubmission(name, email, subject, message)) {
			return jsonResponse({ success: false, error: 'Submission rejected' }, 400);
		}

		// Verify captcha solution with Friendly Captcha API
		const friendlyCaptchaSecret = import.meta.env.CAPTCHA_API_KEY;
		if (!friendlyCaptchaSecret) {
			console.error('Friendly Captcha secret is not configured');
			return jsonResponse({ success: false, error: 'Captcha verification unavailable' }, 503);
		}

		const verifyResponse = await fetch('https://api.friendlycaptcha.com/api/v1/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				solution: captchaSolution,
				secret: friendlyCaptchaSecret
			})
		});

		if (!verifyResponse.ok) {
			console.error('Friendly Captcha verification failed:', verifyResponse.status);
			return jsonResponse({ success: false, error: 'Captcha verification failed' }, 502);
		}

		const verifyResult = await verifyResponse.json();
		if (!verifyResult.success) {
			return jsonResponse({ success: false, error: 'Captcha verification failed' }, 400);
		}

		// Send to Pageclip REST API
		const pageclipApiKey = import.meta.env.PAGECLIP_API_KEY;
		const pageclipFormId = import.meta.env.PAGECLIP_FORM_ID || 'contact';

		if (!pageclipApiKey) {
			return jsonResponse({ success: false, error: 'Pageclip not configured' }, 500);
		}

		const pageclipUrl = `https://api.pageclip.co/data/${pageclipFormId}`;
		const authHeader = `Basic ${Buffer.from(`${pageclipApiKey}:`).toString('base64')}`;

		const pageclipResponse = await fetch(pageclipUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': 'text/plain',
				Authorization: authHeader
			},
			body: JSON.stringify({
				name,
				email,
				subject,
				message
			})
		});

		if (!pageclipResponse.ok) {
			console.error('Pageclip request failed:', await pageclipResponse.text());
			return jsonResponse({ success: false, error: 'Failed to send message' }, 500);
		}

		return jsonResponse({ success: true, message: 'Message sent successfully' }, 200);
	} catch (error) {
		console.error('Contact API error:', error);
		return jsonResponse({ success: false, error: 'Internal server error' }, 500);
	}
};
