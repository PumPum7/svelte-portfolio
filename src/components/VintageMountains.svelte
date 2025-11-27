<script lang="ts">
  const { scrollY = 0 } = $props<{
    scrollY?: number;
  }>();
  
  const gradientStyle = `background: linear-gradient(to bottom, var(--color-parchment) 0%, rgba(244, 228, 188, 0) 50%, var(--color-parchment) 100%)`;
  
  const noiseOverlay = `background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E"); mix-blend-mode: overlay;`;
  
  const backMountainStyle = $derived(`transform: translateY(${scrollY * 0.15}px) scale(1.05); filter: sepia(1) contrast(0.8) brightness(1.1);`);
</script>

<div class="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
  <!-- Gradient overlay -->
  <div class="absolute inset-0" style={gradientStyle}></div>
  
  <!-- Back Mountains - Engraving Style -->
  <div 
    class="absolute bottom-0 left-0 right-0 h-3/4 transition-transform duration-75 ease-out origin-bottom"
    style={backMountainStyle}
  >
    <svg viewBox="0 0 1440 400" class="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
      <path 
        fill="var(--color-sepia-light)" 
        opacity="0.3" 
        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,400L1392,400C1344,400,1248,400,1152,400C1056,400,960,400,864,400C768,400,672,400,576,400C480,400,384,400,288,400C192,400,96,400,48,400L0,400Z"
      />
    </svg>
  </div>

  <!-- Front Mountains - Engraving Style -->
  <div 
    class="absolute bottom-0 left-0 right-0 h-2/3 origin-bottom"
    style="filter: sepia(1) contrast(0.9) brightness(1);"
  >
    <svg viewBox="0 0 1440 400" class="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
      <path 
        fill="var(--color-sepia-dark)" 
        opacity="0.8" 
        d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,250.7C672,267,768,277,864,256C960,235,1056,181,1152,176C1248,171,1344,213,1392,234.7L1440,256L1440,400L1392,400C1344,400,1248,400,1152,400C1056,400,960,400,864,400C768,400,672,400,576,400C480,400,384,400,288,400C192,400,96,400,48,400L0,400Z"
      />
    </svg>
  </div>
  
  <!-- Texture overlay for mountains -->
  <div class="absolute inset-0" style={noiseOverlay}></div>
</div>
