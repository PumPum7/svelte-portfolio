import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import fetch from "node-fetch";

import { SECRET_DISCORD_WEBHOOK, TURNSTILE_SECRET_KEY } from "$env/static/private";

interface TokenValidateResponse {
  "error-codes": string[];
  success: boolean;
  action: string;
  cdata: string;
}

async function validateToken(token: string, secret: string) {
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        response: token,
        secret: secret
      })
    }
  );

  const data = await response.json() as TokenValidateResponse;

  return {
    // Return the status
    success: data.success,

    // Return the first error if it exists
    error: data["error-codes"]?.length ? data["error-codes"][0] : null
  };
}

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");
    const token = data.get("cf-turnstile-response") as string;

    const { success, error } = await validateToken(token, TURNSTILE_SECRET_KEY);

    if (!success) {
      return fail(400, {
        error: error || "Invalid captcha"
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
    const emailTooLong  = email.length > 1000;
    const subjectTooLong  = subject.length > 256;
    const messageTooLong  = message.length > 4000;

    if (nameTooLong || emailTooLong || subjectTooLong || messageTooLong ) {
      return fail(400, {
        name: nameTooLong ? "" : name,
        email: emailTooLong ? "" : email,
        subject: subjectTooLong ? "" : subject,
        message: messageTooLong ? "" : message,
        nameTooLong,
        emailTooLong,
        subjectTooLong,
        messageTooLong
      });
    }

    const params = {
      username: "Portfolio Message Service",
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

    try {
      await fetch(SECRET_DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      })
    } catch (error) {
      return fail(500, { error, isError: true });
    }

    return { success: true };
  }
};
