<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';

  const { activeSection = 'home' } = $props<{
    activeSection?: string;
  }>();
  
  let isScrolled = $state(false);

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
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<nav 
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
  class:py-2={isScrolled}
  class:py-6={!isScrolled}
  class:shadow-md={isScrolled}
  class:bg-parchment={isScrolled}
  class:border-b-2={isScrolled}
  class:border-sepia-dark={isScrolled}
>
  <div class="max-w-6xl mx-auto px-6 flex justify-between items-center">
    <button 
      class="text-2xl font-bold tracking-tight flex items-center gap-2 cursor-pointer group font-heading text-sepia-dark"
      onclick={() => scrollTo('home')}
    >
      <Icon name="logo" />
      <span>PUM<span class="text-forest-green">.WORKS</span></span>
    </button>
    
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
  </div>
</nav>
