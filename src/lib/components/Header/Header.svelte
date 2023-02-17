<script>
	import ThemeSwitch from "./ThemeSwitch.svelte";
	import { page } from "$app/stores";
</script>

<header>
	<div>
		<ul>
			<li class:active={$page.url.pathname === '/'}><a href="/">Home</a></li>
			<li class:active={$page.url.pathname === '/contact'}><a href="/contact">Contact</a></li>
		</ul>

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
			width: 100%;
		}

		@media screen and (max-width: var.$breakpointMedium) {
			width: 80%;
		}

		height: 100%;
		width: 50%;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	ul {
		list-style: none;
		padding: 0;

		display: flex;
		gap: 1rem;

		li {
			&.active {
				a {
          text-decoration: underline;
          color: var(--primary-text-color);
        }
			}

			a {
				color: var(--secondary-text-color);
				text-decoration: none;
			}
		}
	}
</style>
