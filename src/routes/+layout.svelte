<script>
	export const prerender = true;

	import "../app.scss";
	import Header from "../lib/components/Header/Header.svelte";
	import Footer from "../lib/components/Footer.svelte";
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style lang="scss">
  @use '../variables' as var;

  main {
		@media screen and (max-width: var.$breakpointLarge) {
			width: 75%;
			margin: 5vh auto auto;
		}

		@media screen and (max-width: var.$breakpointSmall) {
			width: 80%;
			margin: 2vh auto auto;
		}

		width: 60%;
		margin: 10vh auto auto;
	}
</style>
