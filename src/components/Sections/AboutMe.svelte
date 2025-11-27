<script lang="ts">
  import Section from './Section.svelte';
  import Card from '../Card.svelte';
  import Icon from '../Icon.svelte';

  const SKILLS = {
    frontend: [
      { name: 'TypeScript', level: 90 },
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TailwindCSS', level: 95 },
      { name: 'Svelte', level: 80 },
    ],
    backend: [
      { name: 'Rust', level: 80 },
      { name: 'GoLang', level: 75 },
      { name: 'Python', level: 85 },
      { name: 'Node.js', level: 80 },
    ],
    database: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'FaunaDB', level: 70 },
      { name: 'Redis', level: 60 },
    ]
  };

  const interests = [
    { icon: 'utensils', title: 'Cuisine', desc: 'Cooking & Recipes', color: 'text-deep-red' },
    { icon: 'mountain', title: 'Alpinist', desc: 'Skiing & Hiking', color: 'text-forest-green' },
    { icon: 'code', title: 'Developer', desc: 'Fullstack', color: 'text-gold' },
    { icon: 'database', title: 'Collector', desc: 'Sneakers & Digital Art', color: 'text-sepia-dark' },
  ];

  const skillCategories = [
    { title: 'Frontend', icon: 'code', skills: SKILLS.frontend },
    { title: 'Backend', icon: 'server', skills: SKILLS.backend },
    { title: 'Database', icon: 'database', skills: SKILLS.database },
  ];
</script>

<Section id="about">
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
    <div class="space-y-8">
      <h2 class="text-4xl md:text-5xl font-bold flex items-center gap-4 font-heading">
        <div class="p-3 rounded-sm bg-forest-green/20 text-forest-green">
          <Icon name="about-me" />
        </div>
        About Me
      </h2>
      <div class="space-y-6 text-lg leading-loose text-sepia-light">
        <p>
          I'm Michael, also known as Pum. I am a fullstack developer based in Munich, spending much of my time in the Austrian Alps.
        </p>
        <p>
          My work combines solid backend architecture with responsive frontend development. I focus on creating reliable, scalable applications while keeping the user experience clean and intuitive.
        </p>
        <p>
          Outside of coding, I enjoy cooking, skiing in the mountains, and exploring the world of digital collectibles.
        </p>
      </div>
      <!-- Personal Interests Grid -->
      <div class="grid grid-cols-2 gap-6 mt-10">
        {#each interests as item}
          <Card class="p-5 flex items-center gap-5">
            <div class="p-4 rounded-sm bg-opacity-20 {item.color}">
              <Icon name={item.icon} />
            </div>
            <div>
              <h4 class="font-bold text-lg font-heading">{item.title}</h4>
              <p class="text-sm text-sepia-light font-mono">{item.desc}</p>
            </div>
          </Card>
        {/each}
      </div>
    </div>
    <!-- Skills Visualization -->
    <div class="space-y-12 p-8 rounded-sm relative border-3 double border-sepia-light bg-background">
      <h3 class="text-3xl font-bold text-center mb-8 font-heading">Technical Skills</h3>
      
      <div class="space-y-10">
        {#each skillCategories as category}
          <div>
            <div class="flex items-center gap-3 mb-4 pb-2 border-b text-forest-green border-forest-green/40">
              <Icon name={category.icon} />
              <span class="font-bold text-xl font-heading">{category.title}</span>
            </div>
            <div class="flex flex-wrap gap-3">
              {#each category.skills as skill}
                <span 
                  class="px-4 py-2 rounded-sm text-sm font-bold border-2 transition-all hover:-translate-y-1 bg-parchment border-sepia-light text-sepia-dark font-mono shadow-sm"
                >
                  {skill.name}
                </span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Decorative Seal -->
      <div 
        class="absolute -bottom-6 -right-6 w-20 h-20 rounded-full flex items-center justify-center rotate-12 bg-deep-red text-parchment border-4 double border-gold shadow-lg"
      >
        <Icon name="seal" />
      </div>
    </div>
  </div>
</Section>
