import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import fetch from 'node-fetch';

import { SECRET_DISCORD_WEBHOOK, TURNSTILE_SECRET_KEY } from '$env/static/private';
import {
	validate,
	CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES
} from '@feelinglovelynow/svelte-turnstile';
import { PUBLIC_ENVIRONMENT } from '$env/static/public';

async function validateToken(token: string) {
	const secret =
		PUBLIC_ENVIRONMENT === 'local'
			? CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES
			: TURNSTILE_SECRET_KEY;
	await validate(token, secret);
}

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const email = data.get('email') as string;
		const subject = data.get('subject') as string;
		const message = data.get('message') as string;
		const token = data.get('cf-turnstile-response') as string;

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
