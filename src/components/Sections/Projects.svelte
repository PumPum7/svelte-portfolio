<script lang="ts">
  import Section from './Section.svelte';
  import Card from '../Card.svelte';
  import Icon from '../Icon.svelte';

  const PROJECTS = [
    {
      title: 'URL Shortener',
      desc: 'High-performance URL shortener built for speed and reliability.',
      tags: ['Next.js', 'TypeScript', 'FaunaDB'],
      link: 'https://github.com/PumPum7/url-shortener'
    },
    {
      title: 'Modmail Bot',
      desc: 'Discord modmail implementation with a comprehensive management web dashboard.',
      tags: ['Discord.js', 'React', 'Docker', 'Rust'],
      link: 'https://github.com/PumPum7/modmail'
    },
    {
      title: 'Tatsu.py',
      desc: 'Asynchronous Python API wrapper for the Tatsu gaming community API.',
      tags: ['Python', 'API Wrapper'],
      link: 'https://github.com/PumPum7/Tatsu.py'
    },
    {
      title: 'Rust Database',
      desc: 'A custom-built simple database system featuring a client-server architecture.',
      tags: ['Rust', 'Systems Programming', 'Networking'],
      link: 'https://github.com/PumPum7/rust-database'
    },
    {
      title: 'Svelte Portfolio',
      desc: 'The website you are currently on.',
      tags: ['Svelte', 'TailwindCSS', 'Design'],
      link: 'https://github.com/PumPum7/svelte-portfolio'
    },
    {
      title: 'Tatsu Lookup',
      desc: 'User lookup tool interacting with the Tatsu API for detailed stats.',
      tags: ['JavaScript', 'API Integration'],
      link: 'https://github.com/PumPum7/tatsu-lookup'
    }
  ];
</script>

<Section id="projects">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center flex justify-center items-center gap-3 sm:gap-4 font-heading flex-wrap px-4">
      <span class="h-px w-12 sm:w-20 bg-current opacity-30"></span>
      Featured Projects
      <span class="h-px w-12 sm:w-20 bg-current opacity-30"></span>
    </h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
      {#each PROJECTS as project}
        <Card class="flex flex-col group hover:-translate-y-2">
          <div class="flex justify-between items-start mb-4 sm:mb-6">
            <div class="p-2 sm:p-3 rounded-sm transition-colors bg-sepia-dark/10 text-sepia-dark">
              <Icon name="code" />
            </div>
            <div class="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <a href={project.link} class="cursor-pointer transition-colors hover:text-forest-green" title="View Project" target="_blank" rel="noreferrer">
                <Icon name="arrow-up-right" />
              </a>
            </div>
          </div>
          
          <h3 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 font-heading">{project.title}</h3>
          <p class="text-base sm:text-lg mb-4 sm:mb-6 grow leading-relaxed text-sepia-light">
            {project.desc}
          </p>
          
          <div class="mt-auto pt-3 sm:pt-4 border-t flex flex-wrap gap-2 sm:gap-3 border-sepia-light/40">
            {#each project.tags as tag}
              <span 
                class="text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-sm font-mono bg-forest-green/20 text-forest-green"
              >
                {tag}
              </span>
            {/each}
          </div>
        </Card>
      {/each}
    </div>
    
    <div class="flex justify-center mt-12 sm:mt-16">
      <a 
        href="https://github.com/PumPum7?tab=repositories" 
        target="_blank" 
        rel="noreferrer"
        class="px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-sm font-bold transition-all flex items-center gap-2 sm:gap-3 group border-2 hover:-translate-y-1 bg-parchment border-sepia-dark text-sepia-dark font-heading shadow-lg"
      >
        <span>See All Projects</span>
        <Icon name="arrow-up-right" />
      </a>
    </div>
  </div>
</Section>

