<script lang="ts">
	import FriendlyCaptcha from './FriendlyCaptcha.svelte';
	import { contactSchema } from '../lib/validation';

	type FieldErrors = {
		name: string;
		email: string;
		subject: string;
		message: string;
		captcha: string;
	};

	const emptyErrors = (): FieldErrors => ({
		name: '',
		email: '',
		subject: '',
		message: '',
		captcha: ''
	});

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let website = $state('');
	let captchaSolution = $state('');
	let submittedAt = $state(Date.now());
	let errors = $state<FieldErrors>(emptyErrors());
	let submitError = $state('');
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);

	function validate(): boolean {
		errors = emptyErrors();
		const result = contactSchema.safeParse({
			name,
			email,
			subject,
			message,
			captchaSolution,
			website,
			submittedAt
		});

		if (result.success) return true;

		for (const issue of result.error.issues) {
			const field = issue.path[0];
			if (field === 'captchaSolution') errors.captcha = issue.message;
			if (field === 'name' || field === 'email' || field === 'subject' || field === 'message') {
				errors[field] = issue.message;
			}
		}
		return false;
	}

	function apiResult(result: unknown): { readonly success: boolean; readonly error?: string } {
		if (typeof result !== 'object' || result === null) return { success: false };
		const success = 'success' in result && result.success === true;
		const error = 'error' in result && typeof result.error === 'string' ? result.error : undefined;
		return error === undefined ? { success } : { success, error };
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validate()) return;

		isSubmitting = true;
		submitError = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					email,
					subject,
					message,
					captchaSolution,
					website,
					submittedAt
				})
			});
			const result = apiResult(await response.json());
			if (response.ok && result.success) {
				submitSuccess = true;
				return;
			}
			submitError = result.error ?? 'The message could not be sent. Please try again.';
		} catch {
			submitError = 'The message could not be sent. Please try again later.';
		} finally {
			isSubmitting = false;
		}
	}

	function resetForm() {
		name = '';
		email = '';
		subject = '';
		message = '';
		website = '';
		captchaSolution = '';
		submittedAt = Date.now();
		errors = emptyErrors();
		submitError = '';
		submitSuccess = false;
	}
</script>

{#if submitSuccess}
	<div class="success" role="status" aria-live="polite">
		<p class="eyebrow">Message received</p>
		<h2>Thank you.</h2>
		<p>I’ll reply as soon as I can.</p>
		<button class="button-link secondary" type="button" onclick={resetForm}
			>Send another message</button
		>
	</div>
{:else}
	<form onsubmit={handleSubmit} novalidate>
		{#if submitError}
			<div class="form-alert" role="alert">
				{submitError} If the form keeps failing,
				<a href="https://github.com/PumPum7">use GitHub</a>.
			</div>
		{/if}

		<div class="field-grid">
			<div class="field">
				<label for="name">Name</label>
				<input
					id="name"
					type="text"
					bind:value={name}
					autocomplete="name"
					maxlength="255"
					aria-invalid={errors.name ? 'true' : undefined}
					aria-describedby={errors.name ? 'name-error' : undefined}
				/>
				{#if errors.name}<p id="name-error" class="error">{errors.name}</p>{/if}
			</div>

			<div class="field">
				<label for="email">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					autocomplete="email"
					maxlength="250"
					aria-invalid={errors.email ? 'true' : undefined}
					aria-describedby={errors.email ? 'email-error' : undefined}
				/>
				{#if errors.email}<p id="email-error" class="error">{errors.email}</p>{/if}
			</div>
		</div>

		<div class="field">
			<label for="subject">Subject</label>
			<input
				id="subject"
				type="text"
				bind:value={subject}
				maxlength="255"
				aria-invalid={errors.subject ? 'true' : undefined}
				aria-describedby={errors.subject ? 'subject-error' : undefined}
			/>
			{#if errors.subject}<p id="subject-error" class="error">{errors.subject}</p>{/if}
		</div>

		<div class="field">
			<label for="message">Message</label>
			<textarea
				id="message"
				bind:value={message}
				rows="7"
				maxlength="3500"
				aria-invalid={errors.message ? 'true' : undefined}
				aria-describedby={errors.message ? 'message-error' : undefined}
			></textarea>
			{#if errors.message}<p id="message-error" class="error">{errors.message}</p>{/if}
		</div>

		<div class="honeypot" aria-hidden="true">
			<label for="website">Website</label>
			<input id="website" type="text" bind:value={website} tabindex="-1" autocomplete="off" />
		</div>

		<div class="captcha">
			<FriendlyCaptcha
				sitekey={import.meta.env.PUBLIC_CAPTCHA_SITE_KEY}
				onSolved={(solution) => {
					captchaSolution = solution;
					errors.captcha = '';
				}}
				onError={(error) => {
					captchaSolution = '';
					errors.captcha = error;
				}}
			/>
			{#if errors.captcha}<p class="error">{errors.captcha}</p>{/if}
		</div>

		<button class="button-link submit" type="submit" disabled={isSubmitting}>
			{isSubmitting ? 'Sending…' : 'Send message'}
		</button>
	</form>
{/if}

<style>
	form {
		display: grid;
		gap: 1.4rem;
	}

	.field-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.field {
		display: grid;
		gap: 0.45rem;
	}

	label {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.09em;
		text-transform: uppercase;
	}

	input,
	textarea {
		width: 100%;
		border: 1px solid var(--line-strong);
		border-radius: var(--radius);
		background: var(--canvas);
		padding: 0.85rem;
		color: var(--ink);
		outline: none;
	}

	input:focus,
	textarea:focus {
		border-color: var(--accent);
		box-shadow: 0 0 0 1px var(--accent);
	}

	textarea {
		resize: vertical;
	}

	.error {
		margin: 0;
		color: #b42318;
		font-size: 0.78rem;
	}

	.form-alert {
		border-left: 3px solid #b42318;
		background: rgba(180, 35, 24, 0.06);
		padding: 0.85rem 1rem;
		font-size: 0.85rem;
	}

	.honeypot {
		position: absolute;
		left: -9999px;
	}

	.captcha {
		min-height: 4.5rem;
	}

	.submit {
		width: fit-content;
		cursor: pointer;
	}

	.submit:disabled {
		cursor: wait;
		opacity: 0.55;
	}

	.success {
		border-top: 1px solid var(--line);
		padding-block: 3rem;
	}

	.success h2 {
		margin: 0.75rem 0;
		font-size: clamp(2.5rem, 6vw, 5rem);
		font-weight: 520;
		letter-spacing: -0.06em;
	}

	.success > p:not(.eyebrow) {
		margin-bottom: 2rem;
		color: var(--muted);
	}

	@media (max-width: 620px) {
		.field-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
