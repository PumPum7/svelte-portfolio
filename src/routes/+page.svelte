<script>
	import Img from "@zerodevx/svelte-img";

	import WavingHand from "$lib/components/WavingHand.svelte";
	import AboutMe from "$lib/components/AboutMe.svelte";
	import ProjectList from "$lib/components/ProjectList.svelte";
	import Button from "$lib/components/Button.svelte";

	import profilePicture from "../lib/assets/FamousFox.png?run&height=300&width=300&fit=cover&normalize";

	/** @type {import("./$types").PageData} */
	export let data;
</script>

<section>
	<div>
		<h1>
			<span class="introduction">Hi <WavingHand /> I'm Michael (Pum)</span>, an Austrian based food
			enthusiast 🍲 and fullstack developer 👨‍💻 working with Typescript, React, GoLang and Python.
		</h1>
		<div class="links">
			<Button className="twitter" isLink={true} link="https://twitter.com/Officer_Pum">
				@Officer_Pum
				<i class="twitter-icon" />
			</Button>
			<Button className="contact" isLink={true} link="/contact"
			>Contact
				<i class="arrow-up-right-icon" />
			</Button>
		</div>
	</div>
	<Img alt="Profile Famous Fox Federation NFT" class="profile-picture" src={profilePicture} />
</section>

<AboutMe />

<ProjectList projectData={data.data} />
<Button className="github" isLink={true} link="https://github.com/PumPum7">
	@PumPum7
	<i class="github-icon" />
</Button>

<style lang="scss">
	@use '../variables' as var;
	@use '../mixins.scss' as mixin;

	.github-icon {
		@include mixin.svg-in-text('/icons/github-mark.svg');
	}

	.twitter-icon {
		@include mixin.svg-in-text('/icons/twitter-icon.svg');
	}

	.arrow-up-right-icon {
		@include mixin.svg-in-text('/icons/arrow-up-right.svg');
	}

	section {
		display: flex;
	}

	h1 {
		font-weight: 600;
		line-height: 1.6;
		letter-spacing: 0;
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

		@media screen and (max-width: var.$breakpointSmall) {
			display: none;
		}

		@media screen and (max-width: var.$breakpointMedium) {
			margin-left: 16px;
		}
	}

	.links {
		display: flex;

		:global(a) {
			margin-right: 14px;
		}
	}

	i {
		margin-left: 8px;
	}
</style>
