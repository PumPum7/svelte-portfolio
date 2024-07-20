<script lang="ts">
	import ThemeSwitch from './ThemeSwitch.svelte';
	import { page } from '$app/stores';
	import { i18n } from '$lib/i18n';

	import * as m from '$lib/paraglide/messages.js';
</script>

<header>
	<div>
		<ul>
			<li class:active={i18n.route($page.url.pathname) === '/'}><a href="/">{m.home()}</a></li>
			<li class:active={i18n.route($page.url.pathname) === '/contact'}>
				<a href="/contact">{m.contact()}</a>
			</li>
		</ul>

		<ThemeSwitch />
	</div>
</header>

<style lang="scss">
	@use '../../../variables' as var;
	@use '../../../mixins' as mixins;

	header {
		border-bottom: 1px solid;
		height: 70px;

		position: sticky;
		top: 0;

		z-index: 1;
		backdrop-filter: blur(8px);
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
			display: inline-block;
			position: relative;

			&.active {
				a {
					color: var(--primary-text-color);
				}
			}

			a {
				color: var(--secondary-text-color);
				text-decoration: none;
			}

			&::after {
				content: '';
				position: absolute;
				width: 100%;
				transform: scaleX(0);
				height: 2px;
				bottom: 0;
				left: 0;
				background-color: var(--primary-text-color);
				transform-origin: bottom right;
				transition: transform 0.25s ease-out;
			}

			&:hover {
				&::after {
					transform: scaleX(1);
					transform-origin: bottom left;
				}
			}
		}
	}
</style>
