<script lang="ts">
	import ThemeSwitch from './ThemeSwitch.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let scrollY: number;
	let isScrolled: boolean = false;

	onMount(() => {
		const updateScroll = () => {
			scrollY = window.scrollY;
			isScrolled = scrollY > 50;
		};

		window.addEventListener('scroll', updateScroll);
		return () => {
			window.removeEventListener('scroll', updateScroll);
		};
	});
</script>

<header class:scrolled={isScrolled}>
	<div class="header-content">
		<ul>
			<li class:active={$page.url.pathname === '/'}><a href="/">Home</a></li>
			<li class:active={$page.url.pathname === '/projects'}><a href="/projects">Projects</a></li>
			<li class:active={$page.url.pathname === '/contact'}><a href="/contact">Contact</a></li>
		</ul>

		<ThemeSwitch />
	</div>
</header>

<style lang="scss">
	@use '../../../variables' as var;
	@use '../../../mixins' as mixins;

	header {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		width: 95%;
		max-width: 1200px;
		height: 60px;
		background-color: rgba(var(--background-color-rgb), var.$header-background-opacity);
		backdrop-filter: blur(var.$header-blur);
		border-radius: var.$header-border-radius;
		transition: all 0.3s ease;
		z-index: 1000;

		&.scrolled {
			box-shadow: 0 4px 20px rgba(46, 41, 38, 0.15);
			border: 1px solid var(--border-color);
		}
	}

	.header-content {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30px;
	}

	ul {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 1.5rem;

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
				font-weight: 500;
				transition: color 0.2s ease;

				&:hover {
					color: var(--primary-text-color);
				}
			}

			&::after {
				content: '';
				position: absolute;
				width: 100%;
				transform: scaleX(0);
				height: 2px;
				bottom: -5px;
				left: 0;
				background-color: var(--primary-text-color);
				transform-origin: bottom right;
				transition: transform 0.25s ease-out;
			}

			&:hover::after {
				transform: scaleX(1);
				transform-origin: bottom left;
			}
		}
	}

	@media screen and (max-width: var.$breakpointSmall) {
		header {
			width: 90%;
			bottom: 10px;
		}

		.header-content {
			padding: 0 20px;
		}

		ul {
			gap: 1rem;
		}
	}
</style>
