<script>
	import ThemeSwitch from "./ThemeSwitch.svelte";

	let position;
</script>

<header style={position <= 90 ? "height: 100px;" : position <= 80 ? "height: 75px;" : "height: 70px;"}>
	<div>
		<p>Pum</p>

		<ThemeSwitch />
	</div>
</header>

<style lang="scss">
	@use '../../../variables' as var;

	header {
		border-bottom: 1px solid;

		position: sticky;
		top: 0;

		z-index: 1;
		backdrop-filter: blur(8px);

		transition: background-color 0.5s ease 0s, border-color 0.5s ease 0s, height 0.5s;
	}

	div {
		@media (max-width: var.$breakpointSmall) {
			width: 100%
		}

		height: 100%;
		width: 50%;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

<svelte:window bind:scrollY={position} />
