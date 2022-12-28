<script>
	import Button from '$lib/components/Button.svelte';

	/** @type {import("./$types").ActionData} */
	export let form;

	console.log(form)
</script>

{#if form?.success}
	<h1>Handle success</h1>
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
						maxlength={3500}
					/>
				{/if}
			</div>
			<Button buttonType="submit" className="submit-button" isLink={false}>
				<span>
					<i class="send-icon" />
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
		width: 550px;
		margin: auto;
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
			transition: all 0.4s, transform 0.3s !important;

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
		position: relative;
		z-index: 1;
		padding: 0 35px;
	}

	input,
	textarea {
		margin-bottom: 16px;
		border-radius: 30px;
		position: relative;
		display: block;
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
	}

	input {
		height: 62px;
	}

	textarea {
		min-height: 169px;
		padding: 19px 35px 0;
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
</style>
