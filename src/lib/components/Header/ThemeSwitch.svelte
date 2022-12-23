<script lang="ts">
  let isLightMode = true;

  function handleClick() {
    window.document.body.classList.toggle("dark-mode");

    isLightMode = !isLightMode;
  }
</script>

<button on:click={handleClick} title="Activate {isLightMode ? 'dark' : 'light'} mode">
  {#if isLightMode}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      class="light-icon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      class="dark-icon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  {/if}
</button>


<style lang="scss">
  @use '../../../variables' as var;

  button {
    border-radius: 1rem;
    border-color: transparent;
    --size: 2rem;
    background-color: var(--foreground-color);
    width: calc(var(--size) * 1.5);
    height: calc(var(--size) * 1.5);
    cursor: pointer;

    &:hover {
      border: 1px solid var.$nord9;
      box-shadow: 0 2px 40px -4px var.$nord9;
    }

    .dark-icon {
      stroke: var.$nord4;
    }

    .light-icon {
      stroke: var.$nord3;
    }
  }
</style>