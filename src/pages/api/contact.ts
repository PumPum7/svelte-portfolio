import type { APIRoute } from 'astro';
import { contactSchema } from '../../lib/validation';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const data = await request.json();
		
		const validationResult = contactSchema.safeParse(data);

		if (!validationResult.success) {
			return new Response(JSON.stringify({ success: false, error: validationResult.error.issues[0].message }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
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
				return new Response(JSON.stringify({ success: false, error: 'Captcha verification failed' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			}
		}

		// Send to Discord webhook if configured
		const discordWebhook = import.meta.env.SECRET_DISCORD_WEBHOOK;
		const discordUserId = import.meta.env.DISCORD_USER_ID;

		if (discordWebhook) {
			const webhookPayload = {
				username: 'Portfolio Message Service',
				content: `New message <@${discordUserId}>`,
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

			const webhookResponse = await fetch(discordWebhook, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(webhookPayload)
			});

			if (!webhookResponse.ok) {
				console.error('Discord webhook failed:', await webhookResponse.text());
				return new Response(JSON.stringify({ success: false, error: 'Failed to send message' }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				});
			}
		} else {
			// Log to console if no webhook configured (for development)
			console.log('Contact form submission:', { name, email, subject, message });
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

