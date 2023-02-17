import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import fetch from "node-fetch";

import { SECRET_DISCORD_WEBHOOK } from "$env/static/private";

export const actions: Actions = {
	sendMessage: async ({ request }) => {
		const data = await request.formData();
		const name = data.get("name");
		const email = data.get("email");
		const subject = data.get("subject");
		const message = data.get("message");

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

		const params = {
			username: name,
			content: "New message <@274561812664549376>",
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

		fetch(SECRET_DISCORD_WEBHOOK, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params)
		})
			.then(() => {
				return { sucess: true };
			})
			.catch((error) => {
				return fail(500, { error, isError: true });
			});
	}
};
