<script lang="ts">
	import AboutMe from './Sections/AboutMe.svelte';

	import ContactOptions from './Sections/ContactOptions.svelte';

	import Projects from './Sections/Projects.svelte';

	import { onMount } from 'svelte';
	import VintageBackground from './VintageBackground.svelte';
	import VintageMountains from './VintageMountains.svelte';
	import Navbar from './Navbar.svelte';
	import Icon from './Icon.svelte';

	let scrollY = $state(0);
	let activeSection = $state('home');

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;

			const sections = ['home', 'about', 'projects', 'contact'];
			for (const section of sections) {
				const el = document.getElementById(section);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= 300 && rect.bottom >= 300) {
						activeSection = section;
					}
				}
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollTo(id: string) {
		const element = document.getElementById(id);
		if (element) element.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<div class="text-sepia-dark font-body relative min-h-screen">
	<VintageBackground />
	<Navbar {activeSection} />

	<main>
		<!-- HERO SECTION -->
		<div id="home" class="relative flex h-screen items-center justify-center overflow-hidden">
		<VintageMountains {scrollY} />

		<div
			class="relative z-10 mx-auto mt-[-5vh] max-w-4xl px-4 text-center"
			style:transform="translateY({scrollY * 0.3}px)"
			style:opacity={1 - scrollY / 600}
		>
			<div
				class="border-sepia-light text-forest-green bg-background mb-4 inline-block rounded-sm border-2 px-4 py-2 font-mono text-sm sm:mb-6 sm:px-6 sm:text-base"
			>
				Servus, I'm Michael <span class="animate-wave inline-block origin-bottom-left">👋</span>
			</div>
			<h1
				class="font-heading text-sepia-dark mb-6 text-4xl leading-tight font-bold tracking-tight sm:mb-8 sm:text-5xl md:text-6xl lg:text-8xl"
				style="text-shadow: 2px 2px 0px var(--color-parchment)"
			>
				Fullstack Developer<br />
				<span class="text-forest-green">& Creative Coder</span>
			</h1>
			<p
				class="text-sepia-light mx-auto mb-8 max-w-2xl px-4 text-lg leading-relaxed sm:mb-12 sm:text-xl md:text-2xl"
			>
				Building modern applications from the Austrian Alps with a focus on performance and design.
			</p>

			<div class="flex flex-wrap justify-center gap-4 px-4 sm:gap-6">
				<button
					onclick={() => scrollTo('projects')}
					class="group bg-forest-green text-parchment font-heading relative flex items-center gap-2 overflow-hidden rounded-sm px-6 py-3 text-base font-bold shadow-lg transition-all sm:px-10 sm:py-4 sm:text-lg"
				>
					<span class="relative z-10">View Projects</span>
					<Icon name="arrow-down" />
					<div
						class="absolute inset-0 translate-y-full bg-white/10 transition-transform group-hover:translate-y-0"
					></div>
				</button>
				<a
					href="/contact"
					class="border-sepia-dark text-sepia-dark font-heading flex items-center gap-2 rounded-sm border-3 bg-transparent px-6 py-3 text-base font-bold transition-all hover:bg-black/5 sm:px-10 sm:py-4 sm:text-lg"
				>
					Contact Me
				</a>
			</div>
		</div>

		<div
			class="text-sepia-light absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce sm:bottom-12"
		>
			<Icon name="arrow-down-bounce" />
		</div>
	</div>

		<div class="bg-parchment relative z-20 shadow-[0_-30px_60px_rgba(74,59,42,0.1)]">
			<!-- ABOUT SECTION -->
			<AboutMe></AboutMe>

			<!-- PROJECTS SECTION -->
			<Projects></Projects>

			<!-- CONTACT SECTION -->
			<ContactOptions></ContactOptions>
		</div>
	</main>
</div>

<style>
	.animate-wave {
		animation: wave 1s infinite;
	}

	@keyframes wave {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(10deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
