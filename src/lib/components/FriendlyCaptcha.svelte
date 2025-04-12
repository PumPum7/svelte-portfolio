<script lang="ts">
	import { FriendlyCaptchaSDK, type WidgetHandle } from '@friendlycaptcha/sdk';
	import { onDestroy, onMount } from 'svelte';

	export let sitekey: string;

	let widgetDiv: HTMLElement;
	let widget: WidgetHandle;
	onMount(() => {
		const sdk = new FriendlyCaptchaSDK();
		widget = sdk.createWidget({
			element: widgetDiv,
			sitekey: sitekey,
			theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light'
		});
	});
	onDestroy(() => {
		if (widget) widget.destroy();
	});
</script>

<!-- According to the docs https://docs.friendlycaptcha.com/#/widget_api:
  "This element should contain the `frc-captcha` class for correct styling
  -->
<div class="frc-captcha" bind:this={widgetDiv}></div>
