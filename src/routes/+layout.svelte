<script>
	import "../app.scss";
	import Header from "../lib/components/Header/Header.svelte";
	import Footer from "../lib/components/Footer.svelte";
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style lang="scss">
	main {
		@media (max-width: $breakpointSmall) {
			width: 100%;
		}

		width: 50%;
		margin: 10vh auto auto;

		height: 10000px;
	}
</style>
