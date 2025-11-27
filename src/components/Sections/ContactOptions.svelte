<script lang="ts">
  import Section from './Section.svelte';
  import Icon from '../Icon.svelte';
</script>

<Section id="contact">
  <div class="max-w-4xl mx-auto text-center pb-20">
    <h2 class="text-4xl md:text-5xl font-bold mb-10 font-heading">Get in Touch</h2>
    <p class="text-xl mb-16 max-w-xl mx-auto leading-relaxed text-sepia-light">
      Whether you have a project in mind or just want to chat about code or cuisine, feel free to reach out.
    </p>
    <div class="flex flex-col md:flex-row justify-center items-center gap-8">
      <a 
        href="https://twitter.com/Officer_Pum" 
        target="_blank" 
        rel="noreferrer"
        class="flex items-center gap-4 px-8 py-5 rounded-sm transition-all w-full md:w-auto justify-center group border-2 hover:-translate-y-1 bg-background border-sepia-light text-sepia-dark shadow-lg"
      >
        <Icon name="twitter-icon" />
        <span class="font-bold font-heading">@Officer_Pum</span>
      </a>
      
      <a 
        href="https://github.com/PumPum7" 
        target="_blank" 
        rel="noreferrer"
        class="flex items-center gap-4 px-8 py-5 rounded-sm transition-all w-full md:w-auto justify-center group border-2 hover:-translate-y-1 bg-background border-sepia-light text-sepia-dark shadow-lg"
      >
        <Icon name="github-mark" />
        <span class="font-bold font-heading">GitHub</span>
      </a>
      <div 
        class="flex items-center gap-4 px-8 py-5 rounded-sm transition-all w-full md:w-auto justify-center group border-2 hover:-translate-y-1 cursor-pointer bg-background border-sepia-light text-sepia-dark shadow-lg"
      >
        <Icon name="discord" />
        <span class="font-bold font-heading">@PumPum7</span>
      </div>
    </div>
    
    <div class="mt-24 pt-10 border-t text-base flex flex-col items-center gap-4 border-sepia-dark/20 text-sepia-light">
      <Icon name="footer-icon" />
      <p class="font-heading">&copy; {new Date().getFullYear()} Michael (Pum). Made in the Alps.</p>
    </div>
  </div>
</Section>
