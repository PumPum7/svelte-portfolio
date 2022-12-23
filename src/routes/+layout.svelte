<script>
	import '../app.scss';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
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
		margin: auto;

		height: 10000px;
	}
</style>
