<script lang="ts">
  export let title = "";
</script>

<div>
  {#if title !== ""}
    <h2>{title}</h2>
  {/if}
  <div class="card">
    <slot />
  </div>
</div>


<style lang="scss">
  @use "../../variables" as var;

  .card {
    backdrop-filter: blur(1);
    box-shadow: 0.5px 1px 1px hsl(223deg 5% 80% / 0.333);
    border-radius: 16px;
    border: 0.5px solid rgba(var.$nord9, 5%);
    padding: 16px 22px;
    background-color: var(--foreground-color)
  }
</style>


