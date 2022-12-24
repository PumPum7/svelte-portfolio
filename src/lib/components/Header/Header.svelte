<script>
	import ThemeSwitch from "./ThemeSwitch.svelte";
</script>

<header>
	<div>
		<p>Pum</p>

		<ThemeSwitch />
	</div>
</header>

<style lang="scss">
	@use '../../../variables' as var;

	header {
		border-bottom: 1px solid;
		height: 70px;

		position: sticky;
		top: 0;

		z-index: 1;
		backdrop-filter: blur(8px);

		transition: background-color 0.5s ease 0s, border-color 0.5s ease 0s, height 0.5s;
	}

	div {
		@media screen and (max-width: var.$breakpointSmall) {
			width: 100%
		}

		@media screen and (max-width: var.$breakpointMedium) {
			width: 75%
		}

		height: 100%;
		width: 50%;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>