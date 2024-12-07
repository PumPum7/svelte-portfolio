<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import LanguageBadge from '$lib/components/LanguageBadge.svelte';
	import type { Response } from '$lib/types';

	export let projectData: Response[];
</script>

<h2>Some of my work:</h2>
<ul>
	{#each projectData as project}
		<li>
			<a href={project.repo} target="_blank" rel="noopener noreferrer">
				<Card hasAnimation>
					<h3>{project.name}</h3>
					{#if project?.language}
						<LanguageBadge language={project.language} />
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
</style>
