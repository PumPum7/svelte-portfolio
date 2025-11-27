<script lang="ts">
	import Section from './Section.svelte';
	import Card from '../Card.svelte';
	import Icon from '../Icon.svelte';

	const PROJECTS = [
		{
			title: 'URL Shortener',
			desc: 'High-performance URL shortener built for speed and reliability.',
			tags: ['Next.js', 'TypeScript', 'FaunaDB'],
			link: 'https://github.com/PumPum7/url-shortener'
		},
		{
			title: 'Modmail Bot',
			desc: 'Discord modmail implementation with a comprehensive management web dashboard.',
			tags: ['Discord.js', 'React', 'Docker', 'Rust'],
			link: 'https://github.com/PumPum7/modmail'
		},
		{
			title: 'Tatsu.py',
			desc: 'Asynchronous Python API wrapper for the Tatsu gaming community API.',
			tags: ['Python', 'API Wrapper'],
			link: 'https://github.com/PumPum7/Tatsu.py'
		},
		{
			title: 'Rust Database',
			desc: 'A custom-built simple database system featuring a client-server architecture.',
			tags: ['Rust', 'Systems Programming', 'Networking'],
			link: 'https://github.com/PumPum7/rust-database'
		},
		{
			title: 'Svelte Portfolio',
			desc: 'The website you are currently on.',
			tags: ['Svelte', 'TailwindCSS', 'Design'],
			link: 'https://github.com/PumPum7/svelte-portfolio'
		},
		{
			title: 'Tatsu Lookup',
			desc: 'User lookup tool interacting with the Tatsu API for detailed stats.',
			tags: ['JavaScript', 'API Integration'],
			link: 'https://github.com/PumPum7/tatsu-lookup'
		}
	];
</script>

<Section id="projects">
	<div class="mx-auto max-w-6xl">
		<h2
			class="font-heading mb-12 flex flex-wrap items-center justify-center gap-3 px-4 text-center text-3xl font-bold sm:mb-16 sm:gap-4 sm:text-4xl md:text-5xl"
		>
			<span class="h-px w-12 bg-current opacity-30 sm:w-20"></span>
			Featured Projects
			<span class="h-px w-12 bg-current opacity-30 sm:w-20"></span>
		</h2>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
			{#each PROJECTS as project}
				<Card class="group flex flex-col hover:-translate-y-2">
					<div class="mb-4 flex items-start justify-between sm:mb-6">
						<div class="bg-sepia-dark/10 text-sepia-dark rounded-sm p-2 transition-colors sm:p-3">
							<Icon name="code" />
						</div>
						<div class="flex gap-2 opacity-50 transition-opacity group-hover:opacity-100">
							<a
								href={project.link}
								class="hover:text-forest-green cursor-pointer transition-colors"
								title="View Project"
								target="_blank"
								rel="noreferrer"
							>
								<Icon name="arrow-up-right" />
							</a>
						</div>
					</div>

					<h3 class="font-heading mb-2 text-xl font-bold sm:mb-3 sm:text-2xl">{project.title}</h3>
					<p class="text-sepia-light mb-4 grow text-base leading-relaxed sm:mb-6 sm:text-lg">
						{project.desc}
					</p>

					<div
						class="border-sepia-light/40 mt-auto flex flex-wrap gap-2 border-t pt-3 sm:gap-3 sm:pt-4"
					>
						{#each project.tags as tag}
							<span
								class="bg-forest-green/20 text-forest-green rounded-sm px-2 py-1 font-mono text-xs font-bold sm:px-3 sm:text-sm"
							>
								{tag}
							</span>
						{/each}
					</div>
				</Card>
			{/each}
		</div>

		<div class="mt-12 flex justify-center sm:mt-16">
			<a
				href="https://github.com/PumPum7?tab=repositories"
				target="_blank"
				rel="noreferrer"
				class="group bg-parchment border-sepia-dark text-sepia-dark font-heading flex items-center gap-2 rounded-sm border-2 px-6 py-3 text-base font-bold shadow-lg transition-all hover:-translate-y-1 sm:gap-3 sm:px-10 sm:py-4 sm:text-lg"
			>
				<span>See All Projects</span>
				<Icon name="arrow-up-right" />
			</a>
		</div>
	</div>
</Section>
