<script>
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';

	import '../app.scss';
	import Header from '../lib/components/Header/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });
</script>

<ParaglideJS {i18n}>
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</ParaglideJS>

<style lang="scss">
	@use '../variables' as var;

	main {
		@media screen and (max-width: var.$breakpointLarge) {
			width: 75%;
			margin: 5vh auto auto;
		}

		@media screen and (max-width: var.$breakpointSmall) {
			width: 80%;
		}

		width: 60%;
		margin: 10vh auto auto;
	}
</style>
