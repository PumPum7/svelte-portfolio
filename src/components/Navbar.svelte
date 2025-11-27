<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	const { activeSection = 'home' } = $props<{
		activeSection?: string;
	}>();

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	const navLinks = [
		{ name: 'Home', id: 'home', href: null },
		{ name: 'About', id: 'about', href: null },
		{ name: 'Projects', id: 'projects', href: null },
		{ name: 'Contact', id: 'contact', href: '/contact' }
	];

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollTo(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			isMobileMenuOpen = false;
		}
	}
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-500"
	class:py-2={isScrolled}
	class:py-4={!isScrolled}
	class:shadow-md={isScrolled}
	class:bg-parchment={isScrolled || isMobileMenuOpen}
	class:border-b-2={isScrolled || isMobileMenuOpen}
	class:border-sepia-dark={isScrolled || isMobileMenuOpen}
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="flex items-center justify-between">
			<button
				class="group font-heading text-sepia-dark flex cursor-pointer items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl"
				onclick={() => scrollTo('home')}
			>
				<Icon name="logo" />
				<span>PUM<span class="text-forest-green">.WORKS</span></span>
			</button>

			<!-- Desktop Navigation -->
			<div class="hidden items-center gap-8 md:flex">
				{#each navLinks as link}
					{#if link.href}
						<a
							href={link.href}
							class="group font-body text-sepia-dark relative text-lg font-medium transition-all"
						>
							{link.name}
							<span
								class="bg-forest-green absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full"
							></span>
						</a>
					{:else}
						<button
							onclick={() => scrollTo(link.id)}
							class="group font-body relative text-lg font-medium transition-all {activeSection ===
							link.id
								? 'text-forest-green font-bold'
								: 'text-sepia-dark font-medium'}"
						>
							{link.name}
							<span
								class="absolute -bottom-1 left-0 h-0.5 transition-all group-hover:w-full {activeSection ===
								link.id
									? 'w-full'
									: 'w-0'} bg-forest-green"
							></span>
						</button>
					{/if}
				{/each}
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="text-sepia-dark p-2 md:hidden"
				onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				aria-label="Toggle menu"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if isMobileMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile Navigation Menu -->
		{#if isMobileMenuOpen}
			<div class="border-sepia-light/30 mt-4 border-t pt-4 pb-6 md:hidden">
				<div class="flex flex-col gap-4">
					{#each navLinks as link}
						{#if link.href}
							<a
								href={link.href}
								class="font-body text-sepia-dark hover:bg-forest-green/10 rounded-sm px-4 py-2 text-lg font-medium transition-all"
								onclick={() => (isMobileMenuOpen = false)}
							>
								{link.name}
							</a>
						{:else}
							<button
								onclick={() => scrollTo(link.id)}
								class="font-body rounded-sm px-4 py-2 text-left text-lg font-medium transition-all {activeSection ===
								link.id
									? 'bg-forest-green/20 text-forest-green font-bold'
									: 'text-sepia-dark hover:bg-forest-green/10'}"
							>
								{link.name}
							</button>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	</div>
</nav>
