<script lang="ts">
  import type { PageServerLoad } from "$lib/types"
  import Card from "$lib/components/Card.svelte";

  export let projectData: PageServerLoad;
</script>

<h2>Some of my work:</h2>
<ul>
  {#each projectData as project}
    <li>
      <a href={project.repo} target="_blank" rel="noopener noreferrer">
        <Card>
          <h3>{project.name}</h3>
          {#if project.language.length > 0}
          <p class="language-badge">{project.language[0].name}</p>
          {:else}
          <p class="language-badge">No language specified</p>
          {/if}
          <p>{project.description}</p>
        </Card>
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  ul {
    padding: 0;
  }

  li {
    list-style-type: none;
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: var(--primary-text-color);
  }

  .language-badge {
    font-size: 14px;
    font-weight: 600;
    border-radius: 18px;
    background-color: #5e81ac;
    color: #d8dee9;
    width: fit-content;
    padding: 8px 14px;
  }
</style>
