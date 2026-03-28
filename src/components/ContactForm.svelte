<script lang="ts">
	import Icon from './Icon.svelte';
	import FriendlyCaptcha from './FriendlyCaptcha.svelte';
	import { contactSchema } from '../lib/validation';

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');

	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');
	let captchaSolution = $state('');
	let captchaError = $state('');
	let website = $state('');
	let submittedAt = $state(Date.now());

	let errors = $state({
		name: '',
		email: '',
		subject: '',
		message: '',
		captcha: ''
	});

	function validate(): boolean {
		errors = { name: '', email: '', subject: '', message: '', captcha: '' };

		const result = contactSchema.safeParse({
			name,
			email,
			subject,
			message,
			captchaSolution,
			website,
			submittedAt
		});

		if (!result.success) {
			const fieldMap: Record<string, keyof typeof errors> = {
				name: 'name',
				email: 'email',
				subject: 'subject',
				message: 'message',
				captchaSolution: 'captcha'
			};

			result.error.issues.forEach((issue) => {
				const field = issue.path[0];
				const key = typeof field === 'string' ? fieldMap[field] : undefined;
				if (key) {
					errors[key] = issue.message;
				}
			});
			return false;
		}

		return true;
	}

	function handleCaptchaSolved(solution: string) {
		captchaSolution = solution;
		captchaError = '';
		errors.captcha = '';
	}

	function handleCaptchaError(error: string) {
		captchaError = error;
		captchaSolution = '';
		errors.captcha = error;
	}

	function resetForm() {
		name = '';
		email = '';
		subject = '';
		message = '';
		website = '';
		captchaSolution = '';
		captchaError = '';
		submitError = '';
		errors = { name: '', email: '', subject: '', message: '', captcha: '' };
		submittedAt = Date.now();
		submitSuccess = false;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!validate()) return;

		isSubmitting = true;
		submitError = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
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

			const result = await response.json();

			if (response.ok && result.success) {
				submitSuccess = true;
			} else {
				submitError = result.error || 'Something went wrong. Please try again.';
			}
		} catch {
			submitError = 'Failed to send message. Please try again later.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

{#if submitSuccess}
	<div class="py-12 text-center sm:py-20" role="status" aria-live="polite">
		<div class="success-icon mx-auto mb-6 sm:mb-8">
			<Icon name="exclamation-circle" />
		</div>
		<h2 class="font-heading text-sepia-dark mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
			Thank you!
		</h2>
		<p class="text-sepia-light px-4 text-base sm:text-lg">
			I will get back to you as soon as possible!
		</p>
		<div class="mt-6 flex flex-wrap justify-center gap-4 sm:mt-8">
			<button
				type="button"
				onclick={resetForm}
				class="border-sepia-dark text-sepia-dark font-heading inline-block rounded-sm border-2 px-6 py-2.5 text-base font-bold transition-all hover:-translate-y-1 sm:px-8 sm:py-3 sm:text-lg"
			>
				Send Another Message
			</button>
			<a
				href="/"
				class="bg-forest-green text-parchment font-heading inline-block rounded-sm px-6 py-2.5 text-base font-bold transition-all hover:-translate-y-1 sm:px-8 sm:py-3 sm:text-lg"
			>
				Back to Home
			</a>
		</div>
	</div>
{:else}
	<form onsubmit={handleSubmit} class="mx-auto max-w-lg space-y-5 sm:space-y-6">
		<h1
			class="font-heading text-sepia-dark mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl md:text-4xl"
		>
			Send me a message
		</h1>

		{#if submitError}
			<div
				role="alert"
				aria-live="assertive"
				class="bg-deep-red-background border-deep-red text-deep-red mb-4 rounded-sm border-2 p-3 text-sm sm:mb-6 sm:p-4 sm:text-base"
			>
				{submitError}
				<p class="mt-2 text-xs sm:text-sm">
					If the form keeps failing, reach out via
					<a
						href="https://github.com/PumPum7"
						target="_blank"
						rel="noreferrer"
						class="underline underline-offset-2"
					>
						GitHub
					</a>
					or
					<a
						href="https://x.com/Officer_Pum"
						target="_blank"
						rel="noreferrer"
						class="underline underline-offset-2"
					>
						X
					</a>.
				</p>
			</div>
		{/if}

		<div class="space-y-2">
			<label for="name" class="sr-only">Name</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				placeholder="Name"
				maxlength={255}
				autocomplete="name"
				autocapitalize="words"
				class="bg-background w-full rounded-full border-2 px-4 py-3 text-base transition-all outline-none focus:ring-2 sm:px-6 sm:py-4 sm:text-lg {errors.name
					? 'border-deep-red'
					: 'border-sepia-light'} text-sepia-dark font-body"
			/>
			{#if errors.name}
				<p class="text-deep-red px-4 text-xs sm:px-6 sm:text-sm">{errors.name}</p>
			{/if}
		</div>

		<div class="space-y-2">
			<label for="email" class="sr-only">E-mail</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				placeholder="E-mail"
				maxlength={250}
				autocomplete="email"
				autocapitalize="off"
				spellcheck="false"
				class="bg-background w-full rounded-full border-2 px-4 py-3 text-base transition-all outline-none focus:ring-2 sm:px-6 sm:py-4 sm:text-lg {errors.email
					? 'border-deep-red'
					: 'border-sepia-light'} text-sepia-dark font-body"
			/>
			{#if errors.email}
				<p class="text-deep-red px-4 text-xs sm:px-6 sm:text-sm">{errors.email}</p>
			{/if}
		</div>

		<div class="space-y-2">
			<label for="subject" class="sr-only">Subject</label>
			<input
				id="subject"
				type="text"
				bind:value={subject}
				placeholder="Subject"
				maxlength={255}
				autocomplete="off"
				autocapitalize="sentences"
				class="bg-background w-full rounded-full border-2 px-4 py-3 text-base transition-all outline-none focus:ring-2 sm:px-6 sm:py-4 sm:text-lg {errors.subject
					? 'border-deep-red'
					: 'border-sepia-light'} text-sepia-dark font-body"
			/>
			{#if errors.subject}
				<p class="text-deep-red px-4 text-xs sm:px-6 sm:text-sm">{errors.subject}</p>
			{/if}
		</div>

		<div class="space-y-2">
			<label for="message" class="sr-only">Message</label>
			<textarea
				id="message"
				bind:value={message}
				placeholder="Your Message"
				maxlength={3500}
				rows={6}
				autocomplete="off"
				autocapitalize="sentences"
				spellcheck="true"
				class="bg-background w-full resize-none rounded-3xl border-2 px-4 py-3 text-base transition-all outline-none focus:ring-2 sm:px-6 sm:py-4 sm:text-lg {errors.message
					? 'border-deep-red'
					: 'border-sepia-light'} text-sepia-dark font-body"
			></textarea>
			{#if errors.message}
				<p class="text-deep-red px-4 text-xs sm:px-6 sm:text-sm">{errors.message}</p>
			{/if}
		</div>

		<div class="space-y-2">
			<div class="absolute -left-[100vw] top-auto h-px w-px overflow-hidden" aria-hidden="true">
				<label for="website">Website</label>
				<input
					id="website"
					type="text"
					bind:value={website}
					tabindex="-1"
					autocomplete="off"
				/>
			</div>

			<FriendlyCaptcha
				sitekey={import.meta.env.PUBLIC_CAPTCHA_SITE_KEY || ''}
				onSolved={handleCaptchaSolved}
				onError={handleCaptchaError}
			/>
			{#if errors.captcha}
				<p class="text-deep-red px-4 text-xs sm:px-6 sm:text-sm">{errors.captcha}</p>
			{/if}
			{#if captchaError}
				<p class="text-deep-red px-4 text-xs sm:px-6 sm:text-sm">{captchaError}</p>
			{/if}
		</div>

		<div class="pt-3 text-center sm:pt-4">
			<button
				type="submit"
				disabled={isSubmitting}
				class="bg-forest-green text-parchment font-heading mx-auto flex items-center gap-2 rounded-full px-8 py-3 text-base font-bold shadow-lg transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-3 sm:px-12 sm:py-4 sm:text-lg"
			>
				{#if isSubmitting}
					<Icon name="loading" />
					Sending...
				{:else}
					<Icon name="paper-airplane" />
					Send Message
				{/if}
			</button>
		</div>
	</form>
{/if}
