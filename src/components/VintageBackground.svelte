<script lang="ts">
  const backgroundStyle = `
    background-color: var(--color-parchment);
    background-image: radial-gradient(circle at center, transparent 0%, var(--color-parchment) 70%),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
    background-blend-mode: multiply;
  `;
</script>

<div class="fixed inset-0 pointer-events-none z-0" style={backgroundStyle}></div>
