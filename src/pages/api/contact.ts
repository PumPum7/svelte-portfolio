import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
	try {
		const data = await request.json();
		const { name, email, subject, message, captchaSolution } = data;

		// Validate captcha solution
		if (!captchaSolution) {
			return new Response(JSON.stringify({ success: false, error: 'Captcha verification is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

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

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return new Response(JSON.stringify({ success: false, error: 'All fields are required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Validate field lengths
		if (name.length > 256) {
			return new Response(JSON.stringify({ success: false, error: 'Name is too long' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (email.length > 250 || !email.includes('@') || !email.includes('.')) {
			return new Response(JSON.stringify({ success: false, error: 'Invalid email address' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (subject.length > 256) {
			return new Response(JSON.stringify({ success: false, error: 'Subject is too long' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (message.length > 4000) {
			return new Response(JSON.stringify({ success: false, error: 'Message is too long' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Send to Discord webhook if configured
		const discordWebhook = import.meta.env.SECRET_DISCORD_WEBHOOK;

		if (discordWebhook) {
			const webhookPayload = {
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
