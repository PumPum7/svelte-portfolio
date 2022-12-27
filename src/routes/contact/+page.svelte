<script>
	import Button from "$lib/components/Button.svelte";

	/** @type {import("./$types").PageData} */
	export let data;


	/** @type {import("./$types").ActionData} */
	export let form;

</script>

<!-- svelte-ignore TODO: The inputs have to be wrapped in divs -->


<section>
	<h1>Send me a message</h1>
	<form action="?/sendMessage" method="post" novalidate="novalidate">
		<input class:missing={form?.missingName} data-validate="Please enter your name" name="name" placeholder="Name"
					 required
					 type="text">
		<input name="email" placeholder="E-mail" required type="email" />
		<input name="subject" placeholder="Subject" required type="text" />
		<textarea name="message" placeholder="Your Message" required />
		<Button buttonType="submit" className="submit-button" isLink={false}>
			<span>
				<i class="send-icon" />
				Send
			</span>
		</Button>
	</form>
</section>

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

		input {
			height: 62px;
		}

		textarea {
			min-height: 169px;
			padding: 19px 35px 0;
		}
	}

	:global(.missing) {
		&::before {
			content: attr(data-validate);
			position: absolute;
			z-index: 1000;
			max-width: 70%;
			background-color: #fff;
			border: 1px solid #c80000;
			border-radius: 14px;
			padding: 4px 25px 4px 10px;
			top: 50%;
			transform: translateY(-50%);
			right: 10px;
			pointer-events: none;
			font-family: Inter, sans-serif;
			color: #c80000;
			font-size: 13px;
			line-height: 1.4;
			text-align: left;
			visibility: hidden;
			opacity: 0;
			-webkit-transition: opacity .4s;
			-o-transition: opacity .4s;
			-moz-transition: opacity .4s;
			transition: opacity .4s;
		}

		&::after {
			content: "!";
			display: block;
			position: absolute;
			z-index: 1100;
			color: #c80000;
			font-size: 16px;
			top: 50%;
			transform: translateY(-50%);
			right: 16px;
		}
	}

	input, textarea {
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
