import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import fetch from 'node-fetch';

import { SECRET_DISCORD_WEBHOOK, CAPTCHA_API_KEY } from '$env/static/private';
import { PUBLIC_CAPTCHA_SITE_KEY } from '$env/static/public';

async function validateToken(token: string) {
	const verifyResponse = await fetch('https://global.frcapi.com/api/v2/captcha/siteverify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': CAPTCHA_API_KEY
		},
		body: JSON.stringify({
			response: token,
			sitekey: PUBLIC_CAPTCHA_SITE_KEY
		})
	});

	const result = (await verifyResponse.json()) as {
		success: boolean;
		data?: {
			challenge: {
				timestamp: string;
				origin: string;
			};
		};
		error?: {
			error_code: string;
			detail: string;
		};
	};

	if (!result.success) {
		throw new Error('Captcha verification failed');
	}
}

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const email = data.get('email') as string;
		const subject = data.get('subject') as string;
		const message = data.get('message') as string;
		const token = data.get('frc-captcha-response') as string;

		try {
			await validateToken(token);
		} catch (error) {
			return fail(400, {
				error: error || 'Invalid captcha'
			});
		}

		if (!name || !email || !subject || !message) {
			return fail(400, {
				name,
				email,
				subject,
				message,
				missingName: !name,
				missingEmail: !email,
				missingSubject: !subject,
				missingMessage: !message
			});
		}

		const nameTooLong = name.length > 256;
		const emailTooLong = email.length > 1000 || !email.includes('@') || !email.includes('.');
		const subjectTooLong = subject.length > 256;
		const messageTooLong = message.length > 4000;

		if (nameTooLong || emailTooLong || subjectTooLong || messageTooLong) {
			return fail(400, {
				name: nameTooLong ? '' : name,
				email: emailTooLong ? '' : email,
				subject: subjectTooLong ? '' : subject,
				message: messageTooLong ? '' : message,
				nameTooLong,
				emailTooLong,
				subjectTooLong,
				messageTooLong
			});
		}

		const params = {
			username: 'Portfolio Message Service',
			content: 'New message <@274561812664549376>',
			embeds: [
				{
					author: {
						name: name
					},
					title: subject,
					description: `**E-Mail:** ${email}\n\n**Message:** ${message}`,
					color: 10731148
				}
			]
		};

		try {
			await fetch(SECRET_DISCORD_WEBHOOK, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(params)
			});
		} catch (error) {
			return fail(500, { error, isError: true });
		}

		return { success: true };
	}
};
