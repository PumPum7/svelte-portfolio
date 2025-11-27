<script lang="ts">
  const { class: className, children } = $props<{
    class?: string;
    children?: () => any;
  }>();
</script>

<div 
  class="relative p-5 sm:p-6 md:p-8 rounded-sm transition-all duration-300 group {className} bg-card-bg border-2 border-sepia-light shadow-box-shadow"
>
  <!-- Decorative corner flourishes -->
  <div class="absolute top-1 left-1 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-l-2 border-sepia-light"></div>
  <div class="absolute top-1 right-1 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-r-2 border-sepia-light"></div>
  <div class="absolute bottom-1 left-1 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-l-2 border-sepia-light"></div>
  <div class="absolute bottom-1 right-1 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-r-2 border-sepia-light"></div>
  
  {@render children?.()}
</div>
