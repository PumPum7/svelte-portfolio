<script lang="ts">
	import type { ActionData } from './$types';

	import Button from '$lib/components/Button.svelte';
	import { Turnstile, PUBLIC_KEY_ALWAYS_PASSES } from '@feelinglovelynow/svelte-turnstile';

	import { PUBLIC_TURNSTILE_KEY, PUBLIC_ENVIRONMENT } from '$env/static/public';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

{#if form?.success}
	<section class="success">
		<div class="success-icon">
			<div class="success-icon__tip"></div>
			<div class="success-icon__long"></div>
		</div>
		<h1>Thank you!</h1>
		<p>I will get back to you as soon as possible!</p>
	</section>
{:else}
	<section>
		<h1>Send me a message</h1>
		<form method="post" novalidate={true}>
			<div
				data-validate-missing="Please enter your name"
				class:missing={form?.missingName}
				data-validate-invalid="Your name cant be longer than 255 characters"
				class:invalid-input={form?.nameTooLong}
				class="input-container"
			>
				<input
					on:focus={() => {
						if (form) form.missingName = false;
					}}
					name="name"
					placeholder="Name"
					required
					type="text"
					maxlength={255}
					value={form?.name ?? ''}
				/>
			</div>
			<div
				data-validate-missing="Please enter your E-Mail"
				class:missing={form?.missingEmail}
				data-validate-invalid="Please enter a valid E-Mail"
				class:invalid-input={form?.emailTooLong}
				class="input-container"
			>
				<input
					on:focus={() => {
						if (form) form.missingEmail = false;
					}}
					name="email"
					placeholder="E-mail"
					required
					type="email"
					maxlength={250}
					value={form?.email ?? ''}
				/>
			</div>
			<div
				data-validate-missing="Please enter a Subject"
				class:missing={form?.missingSubject}
				data-validate-invalid="The subject cant be longer than 256 characters"
				class:invalid-input={form?.subjectTooLong}
				class="input-container"
			>
				<input
					on:focus={() => {
						if (form) form.missingSubject = false;
					}}
					name="subject"
					placeholder="Subject"
					required
					type="text"
					maxlength={255}
					value={form?.subject ?? ''}
				/>
			</div>

			<div
				data-validate-missing="Please enter your Message"
				class:missing={form?.missingMessage}
				data-validate-invalid="Please enter a valid message"
				class:invalid-input={form?.messageTooLong}
				class="input-container"
			>
				<!-- svelte-ignore This if block is added to add the previously inputted data only if it exists -->
				{#if form?.message}
					<textarea
						on:focus={() => {
							if (form) form.missingMessage = false;
						}}
						name="message"
						placeholder="Your Message"
						required
						maxlength={3500}
					>
						{form.message ?? ''}
					</textarea>
				{:else}
					<textarea
						on:focus={() => {
							if (form) form.missingMessage = false;
						}}
						name="message"
						placeholder="Your Message"
						required
						maxlength={5000}
					></textarea>
				{/if}
			</div>
			<Turnstile
				sitekey={PUBLIC_ENVIRONMENT === 'local' ? PUBLIC_KEY_ALWAYS_PASSES : PUBLIC_TURNSTILE_KEY}
			/>
			<Button buttonType="submit" className="submit-button" isLink={false}>
				<span>
					<i class="send-icon"></i>
					Send
				</span>
			</Button>
		</form>
	</section>
{/if}

<style lang="scss">
	@use '../../mixins.scss' as mixin;
	@use '../../variables.scss' as vars;

  section {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    @media (max-width: vars.$breakpointSmall) {
      width: 100%;
    }

    @media (min-width: vars.$breakpointLarge) {
      width: 550px;
      margin: auto;
    }
  }

	form {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;

		:global(button) {
			border-radius: 30px;
			border: none;
			cursor: pointer;
			padding: 0 40px;
			height: 62px;
			margin-top: 16px;
			transition:
				all 0.4s,
				transform 0.3s !important;

			&:hover {
				padding: 0 50px;
			}

			background-color: var(--button-color);
			color: vars.$nord6;
		}
	}

	:global(.missing) {
		@include mixin.error-message-form(attr(data-validate-missing), vars.$nord11);
	}

	:global(.invalid-input) {
		@include mixin.error-message-form(attr(data-validate-invalid), vars.$nord11);
	}

	.input-container {
		position: relative;
		width: 100%;
		border-radius: 31px;
		margin-bottom: 16px;
		z-index: 1;
		padding: 0 35px;

		@media (max-width: vars.$breakpointSmall) {
			padding: 0;
		}
	}

	input,
	textarea {
		margin-bottom: 16px;
		border-radius: 30px;
		width: 100%;
		background: var(--foreground-color);
		font-family: Inter, sans-serif;
		font-size: 18px;
		line-height: 1.2;
		padding: 0 35px;
		outline: none !important;
		border: none !important;
		caret-color: var(--secondary-text-color);

		&::placeholder {
			color: var(--secondary-text-color);
			font-family: Inter, sans-serif;
			opacity: 0.5;
		}

		@media (max-width: vars.$breakpointSmall) {
			font-size: 16px;
			width: 90%;
			padding: 0 20px;
		}
	}

	input {
		height: 62px;
	}

	textarea {
		min-height: 169px;
		padding: 19px 35px 0;

		@media (max-width: vars.$breakpointSmall) {
			min-height: 100px;
			padding: 19px 20px 0;
		}
	}

	span {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 16px;
		font-weight: 600;
		text-transform: uppercase;
	}

	.send-icon {
		@include mixin.svg-in-text('/icons/paper-airplane.svg');
		margin-right: 8px;
	}

	.success {
		height: 70vh;
		align-items: center;
		justify-content: center;

		// The icon specifics
		// Variables
		$green: #4bb543;
		$icon-base-size: 20px;

		// Structure
		.success-icon {
			display: inline-block;
			width: 8em;
			height: 8em;
			font-size: $icon-base-size;
			border-radius: 50%;
			border: 4px solid lighten($green, 20%);
			background-color: transparent;
			position: relative;
			overflow: hidden;
			transform-origin: center;
			animation: showSuccess 180ms ease-in-out;
			transform: scale(1);
		}

		// Elements
		.success-icon {
			&__tip,
			&__long {
				display: block;
				position: absolute;
				height: 4px;
				background-color: lighten($green, 20%);
				border-radius: 10px;
			}

			&__tip {
				width: 2.4em;
				top: 4.5em;
				left: 1.5em;
				transform: rotate(45deg);
				animation: tipInPlace 300ms ease-in-out;
				animation-fill-mode: forwards;
				animation-delay: 180ms;
				visibility: hidden;
			}

			&__long {
				width: 4em;
				transform: rotate(-45deg);
				top: 3.7em;
				left: 2.75em;
				animation: longInPlace 140ms ease-in-out;
				animation-fill-mode: forwards;
				visibility: hidden;
				animation-delay: 300ms + 140ms;
			}
		}

		@keyframes showSuccess {
			from {
				transform: scale(0);
			}
			to {
				transform: scale(1);
			}
		}

		@keyframes tipInPlace {
			from {
				width: 0;
				top: 0;
				left: -1.6em;
			}
			to {
				width: 2.4em;
				top: 4.3em;
				left: 1.4em;
				visibility: visible;
			}
		}

		@keyframes longInPlace {
			from {
				width: 0;
				top: 5.1em;
				left: 3.2em;
			}
			to {
				width: 4em;
				top: 3.7em;
				left: 2.75em;
				visibility: visible;
			}
		}
	}
</style>
