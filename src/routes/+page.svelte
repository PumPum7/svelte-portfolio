<script>
	import profilePicture from "../lib/assets/FamousFox.png?run&height=300&width=300&fit=cover&normalize";
	import Img from "@zerodevx/svelte-img";
	import WavingHand from "$lib/components/WavingHand.svelte";
	import AboutMe from "$lib/components/AboutMe.svelte";
</script>

<section>
	<div>
		<h1>
			<span class="introduction">Hi <WavingHand /> I'm Michael (Pum)</span>, an Austrian based food
			enthusiast 🍲 and fullstack developer 👨‍💻 working with Typescript, React, GoLang and Python.
		</h1>
		<div class="links">
			<a
				class="twitter"
				href="https://twitter.com/Officer_Pum"
				rel="noopener noreferrer"
				target="_blank"
			>
				@Officer_Pum
				<i class="fa-brands fa-twitter" />
			</a>
			<a class="github" href="https://github.com/PumPum7" rel="noopener noreferrer" target="_blank"
			>@PumPum7
				<i class="fa-brands fa-github" /></a
			>
		</div>
	</div>
	<Img alt="Profile Famous Fox Federation NFT" class="profile-picture" src={profilePicture} />
</section>

<AboutMe />

<style lang="scss">
	@use '../variables' as var;

	@import '../fontawesome/fontawesome.scss';
	@import '../fontawesome/brands.scss';

	section {
		display: flex;
	}

	h1 {
		font-weight: 600;
		line-height: 1.6;
		letter-spacing: 0;
		font-size: 2rem;
		margin: 0 2.25rem 2.25rem 0;
		padding: 0;
		text-rendering: optimizelegibility;
		color: var(--secondary-text-color);

		.introduction {
			color: var(--primary-text-color);
		}
	}

	:global(.profile-picture) {
		border-radius: 12px;
	}

	.links {
		display: flex;

		a {
			color: var.$nord10;
			padding: 11px 16px;
			border-radius: 12px;
			background-color: rgb(var.$nord10, 10%);
			text-decoration: none;
			font-weight: 500;

			display: flex;
			align-items: center;

			&:hover {
				transform: scale(1.05);
				transition: transform 0.3s;
				box-shadow: 0 2px 40px -4px var.$nord9;
			}

			&:not(:first-child) {
				margin-left: 14px;
			}

			i {
				fill: var.$nord10;
				margin-left: 8px;
			}
		}
	}
</style>
