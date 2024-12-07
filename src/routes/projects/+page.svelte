<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import LanguageBadge from '$lib/components/LanguageBadge.svelte';
	export let data: PageData;
	
	let selectedTech: string = '';
	let technologies = new Set<string>(data.data.filter(project => project.language.name !== 'Unknown').map(project => project.language.name));
	
	$: filteredProjects = selectedTech 
		? data.data.filter(project => project.language.name === selectedTech)
		: data.data;
</script>

<h1>My Projects</h1>

<div class="filters">
	<button class:active={selectedTech === ''} on:click={() => selectedTech = ''}>All</button>
	{#each [...technologies] as tech}
		<button class:active={selectedTech === tech} on:click={() => selectedTech = tech}>
			{tech}
		</button>
	{/each}
</div>

<div class="projects-grid">
	{#each filteredProjects as project}
		<Card hasAnimation>
			{#if project.previewImage}
				<img src={project.previewImage} alt={project.name} />
			{/if}
			<h3>{project.name}</h3>
			<div class="technologies">
				{#if project.technologies}
					{#each project.technologies as tech}
						<LanguageBadge language={{ name: tech }} />
					{/each}
				{/if}
			</div>
			<p>{project.description}</p>
			<div class="links">
				<a href={project.repo} target="_blank" rel="noopener noreferrer">View on GitHub</a>
				{#if project.demo}
					<a href={project.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>
				{/if}
			</div>
		</Card>
	{/each}
</div>

<style lang="scss">
	@use '../../variables' as var;

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.filters {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin: 2rem 0;

		button {
			padding: 0.5rem 1rem;
			border: 1px solid var(--border-color);
			border-radius: 20px;
			background: var(--foreground-color);
			cursor: pointer;

			&.active {
				background: var(--button-color);
				color: var(--foreground-color);
			}
		}
	}

	.technologies {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1rem 0;
	}

	.links {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;

		a {
			color: var(--button-color);
			text-decoration: none;
			
			&:hover {
				text-decoration: underline;
			}
		}
	}

	img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		border-radius: 8px;
		margin-bottom: 1rem;
	}
</style>
