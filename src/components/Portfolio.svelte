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

<div class="min-h-screen relative text-sepia-dark font-body">
  <VintageBackground />
  <Navbar {activeSection} />
  
  <!-- HERO SECTION -->
  <div id="home" class="relative h-screen flex items-center justify-center overflow-hidden">
    <VintageMountains {scrollY} />
    
    <div 
      class="relative z-10 text-center px-4 max-w-4xl mx-auto mt-[-5vh]"
      style:transform="translateY({scrollY * 0.3}px)"
      style:opacity={1 - scrollY / 600}
    >
      <div 
        class="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 rounded-sm border-2 border-sepia-light text-forest-green font-mono bg-background text-sm sm:text-base"
      >
        Servus, I'm Michael <span class="animate-wave inline-block origin-bottom-left">👋</span>
      </div>
      <h1 
        class="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-6 sm:mb-8 font-heading text-sepia-dark leading-tight"
        style="text-shadow: 2px 2px 0px var(--color-parchment)"
      >
        Fullstack Developer<br />
        <span class="text-forest-green">& Creative Coder</span>
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 text-sepia-light px-4">
        Building modern applications from the Austrian Alps with a focus on performance and design.
      </p>
      
      <div class="flex justify-center gap-4 sm:gap-6 flex-wrap px-4">
        <button 
          onclick={() => scrollTo('projects')}
          class="px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-sm font-bold transition-all flex items-center gap-2 group relative overflow-hidden bg-forest-green text-parchment font-heading shadow-lg"
        >
          <span class="relative z-10">View Projects</span>
          <Icon name="arrow-down" />
          <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
        </button>
        <a 
          href="/contact"
          class="px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-sm font-bold transition-all flex items-center gap-2 hover:bg-black/5 border-3 border-sepia-dark text-sepia-dark font-heading bg-transparent"
        >
          Contact Me
        </a>
      </div>
    </div>

    <div class="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce text-sepia-light">
      <Icon name="arrow-down-bounce" />
    </div>
  </div>

  <div class="relative z-20 shadow-[0_-30px_60px_rgba(74,59,42,0.1)] bg-parchment">
    
    <!-- ABOUT SECTION -->
    <AboutMe></AboutMe>

    <!-- PROJECTS SECTION -->
    <Projects></Projects>

    <!-- CONTACT SECTION -->
    <ContactOptions></ContactOptions>
  </div>
</div>

<style>
  .animate-wave {
    animation: wave 1s infinite;
  }

  @keyframes wave {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(10deg); }
    100% { transform: rotate(0deg); }
  }
</style>
