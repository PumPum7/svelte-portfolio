<script lang="ts">
  const { id, class: className, children } = $props<{
    id?: string;
    class?: string;
    children?: () => any;
  }>();
</script>

<section {id} class="relative min-h-screen py-24 px-6 {className}">
  {@render children?.()}
  <div 
    class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px opacity-30 bg-gradient-to-r from-transparent via-sepia-dark to-transparent"
  ></div>
</section>
