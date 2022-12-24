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
		@media screen and (max-width: $breakpointMedium) {
			width: 75%;
			margin: 5vh auto auto;
		}

		@media screen and (max-width: $breakpointSmall) {
			width: 80%;
			margin: 2vh auto auto;
		}

		width: 50%;
		margin: 10vh auto auto;
	}
</style>
