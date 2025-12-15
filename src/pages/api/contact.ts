import type { APIRoute } from 'astro';
import { contactSchema } from '../../lib/validation';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const data = await request.json();

		const validationResult = contactSchema.safeParse(data);

		if (!validationResult.success) {
			return new Response(
				JSON.stringify({ success: false, error: validationResult.error.issues[0].message }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		const { name, email, subject, message, captchaSolution } = validationResult.data;

		// Verify captcha solution with Friendly Captcha API
		const friendlyCaptchaSecret = import.meta.env.CAPTCHA_API_KEY;
		if (friendlyCaptchaSecret) {
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

			const verifyResult = await verifyResponse.json();
			if (!verifyResult.success) {
				return new Response(
					JSON.stringify({ success: false, error: 'Captcha verification failed' }),
					{
						status: 400,
						headers: { 'Content-Type': 'application/json' }
					}
				);
			}
		}

		// Send to Pageclip REST API
		const pageclipApiKey = import.meta.env.PAGECLIP_API_KEY;
		const pageclipFormId = import.meta.env.PAGECLIP_FORM_ID || 'contact';

		if (!pageclipApiKey) {
			return new Response(JSON.stringify({ success: false, error: 'Pageclip not configured' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
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
			return new Response(JSON.stringify({ success: false, error: 'Failed to send message' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response(JSON.stringify({ success: true, message: 'Message sent successfully' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Contact API error:', error);
		return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
