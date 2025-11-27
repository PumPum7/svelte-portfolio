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
    { name: 'Contact', id: 'contact', href: '/contact' },
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
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
  class:py-2={isScrolled}
  class:py-4={!isScrolled}
  class:shadow-md={isScrolled}
  class:bg-parchment={isScrolled || isMobileMenuOpen}
  class:border-b-2={isScrolled || isMobileMenuOpen}
  class:border-sepia-dark={isScrolled || isMobileMenuOpen}
>
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex justify-between items-center">
      <button 
        class="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 cursor-pointer group font-heading text-sepia-dark"
        onclick={() => scrollTo('home')}
      >
        <Icon name="logo" />
        <span>PUM<span class="text-forest-green">.WORKS</span></span>
      </button>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex gap-8 items-center">
        {#each navLinks as link}
          {#if link.href}
            <a
              href={link.href}
              class="text-lg font-medium transition-all relative group font-body text-sepia-dark font-medium"
            >
              {link.name}
              <span 
                class="absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full bg-forest-green"
              ></span>
            </a>
          {:else}
            <button
              onclick={() => scrollTo(link.id)}
              class="text-lg font-medium transition-all relative group font-body {activeSection === link.id ? 'text-forest-green font-bold' : 'text-sepia-dark font-medium'}"
            >
              {link.name}
              <span 
                class="absolute -bottom-1 left-0 h-0.5 transition-all group-hover:w-full {activeSection === link.id ? 'w-full' : 'w-0'} bg-forest-green"
              ></span>
            </button>
          {/if}
        {/each}
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="md:hidden p-2 text-sepia-dark"
        onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {#if isMobileMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    {#if isMobileMenuOpen}
      <div class="md:hidden pt-4 pb-6 border-t border-sepia-light/30 mt-4">
        <div class="flex flex-col gap-4">
          {#each navLinks as link}
            {#if link.href}
              <a
                href={link.href}
                class="text-lg font-medium py-2 px-4 rounded-sm transition-all font-body text-sepia-dark hover:bg-forest-green/10"
                onclick={() => isMobileMenuOpen = false}
              >
                {link.name}
              </a>
            {:else}
              <button
                onclick={() => scrollTo(link.id)}
                class="text-lg font-medium py-2 px-4 rounded-sm transition-all text-left font-body {activeSection === link.id ? 'bg-forest-green/20 text-forest-green font-bold' : 'text-sepia-dark hover:bg-forest-green/10'}"
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
