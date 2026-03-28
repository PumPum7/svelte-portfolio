<script lang="ts">
	import Section from './Section.svelte';
	import Card from '../Card.svelte';
	import Icon from '../Icon.svelte';

	type FeaturedProject = {
		title: string;
		eyebrow: string;
		summary: string;
		challenge: string;
		approach: string;
		impact: string;
		tags: string[];
		link: string;
	};

	type ProjectNote = {
		title: string;
		desc: string;
		focus: string;
		tags: string[];
		link: string;
	};

	const featuredProjects: FeaturedProject[] = [
		{
			title: 'URL Shortener',
			eyebrow: 'Performance-focused web utility',
			summary: 'A compact product built around fast redirects, dependable storage, and a low-friction management flow.',
			challenge: 'Build a utility that stays simple on the surface while still respecting the hot path where every redirect matters.',
			approach: 'Implemented with Next.js, TypeScript, and FaunaDB to keep the experience typed end to end and the persistence layer lean.',
			impact: 'Works as a focused case study in balancing latency, operational simplicity, and clean UI for a tool people use quickly and often.',
			tags: ['Next.js', 'TypeScript', 'FaunaDB'],
			link: 'https://github.com/PumPum7/url-shortener'
		},
		{
			title: 'Modmail Bot',
			eyebrow: 'Cross-surface moderation workflow',
			summary: 'A Discord modmail system paired with a management dashboard for moderators who need context and control.',
			challenge: 'Bridge user-facing conversations and moderator tooling without turning the workflow into a patchwork of disconnected screens.',
			approach: 'Combined Discord.js, React, Docker, and Rust across the stack to support bot interactions and a more structured operations view.',
			impact: 'Shows product thinking across interfaces: better messaging UX for communities, and better visibility for the people running them.',
			tags: ['Discord.js', 'React', 'Docker', 'Rust'],
			link: 'https://github.com/PumPum7/modmail'
		},
		{
			title: 'Rust Database',
			eyebrow: 'Systems programming deep dive',
			summary: 'A simple client-server database built as a hands-on exercise in storage, networking, and protocol design.',
			challenge: 'Learn the internals by building the moving parts directly instead of treating the database layer as a black box.',
			approach: 'Designed around Rust, a custom networked architecture, and a deliberately low-level implementation path to surface tradeoffs clearly.',
			impact: 'Acts as a stronger systems piece in the portfolio, highlighting debugging discipline and comfort below the framework layer.',
			tags: ['Rust', 'Systems Programming', 'Networking'],
			link: 'https://github.com/PumPum7/rust-database'
		}
	];

	const projectNotes: ProjectNote[] = [
		{
			title: 'Tatsu.py',
			desc: 'Asynchronous Python API wrapper for the Tatsu gaming community API.',
			focus: 'API ergonomics, async workflows, and making an external service easier to integrate.',
			tags: ['Python', 'API Wrapper'],
			link: 'https://github.com/PumPum7/Tatsu.py'
		},
		{
			title: 'Svelte Portfolio',
			desc: 'The site you are looking at now, built around a vintage visual language and lightweight interaction.',
			focus: 'Astro + Svelte composition, motion design, and a portfolio experience that feels distinct instead of template-driven.',
			tags: ['Svelte', 'TailwindCSS', 'Design'],
			link: 'https://github.com/PumPum7/svelte-portfolio'
		},
		{
			title: 'Tatsu Lookup',
			desc: 'User lookup tool for the Tatsu API with a faster path to detailed stats and profile information.',
			focus: 'Useful data retrieval, API integration, and a narrower interface built around a specific user task.',
			tags: ['JavaScript', 'API Integration'],
			link: 'https://github.com/PumPum7/tatsu-lookup'
		},
		{
			title: 'Pomate',
			desc: 'A native macOS Pomodoro timer with status bar controls, task tracking, and productivity statistics.',
			focus: 'Swift app development, desktop UX, and a more personal utility product built around everyday focus workflows.',
			tags: ['Swift', 'macOS', 'Productivity'],
			link: 'https://github.com/PumPum7/Pomate'
		}
	];
</script>

<Section id="projects" class="overflow-hidden">
	<div class="mx-auto max-w-6xl">
		<div class="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
			<p class="text-forest-green font-mono text-sm font-bold tracking-[0.2em] uppercase">
				Pinned Projects
			</p>
			<h2 class="font-heading mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
				GitHub Work Framed as Case Studies
			</h2>
			<p class="text-sepia-light mt-5 text-lg leading-relaxed sm:text-xl">
				I like projects that have a clear constraint, a specific user problem, and enough technical
				depth to make the implementation decisions matter.
			</p>
		</div>

		<div class="space-y-8 sm:space-y-10">
			{#each featuredProjects as project, index (project.title)}
				<Card
					class="grid gap-8 border-sepia-dark/20 bg-card-bg/95 md:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.9fr)] md:gap-10"
				>
					<div class="space-y-6">
						<div class="flex flex-wrap items-start justify-between gap-4">
							<div class="max-w-2xl">
								<p class="text-forest-green font-mono text-xs font-bold tracking-[0.18em] uppercase sm:text-sm">
									0{index + 1} / {project.eyebrow}
								</p>
								<h3 class="font-heading mt-3 text-2xl font-bold sm:text-3xl">{project.title}</h3>
								<p class="text-sepia-light mt-4 text-base leading-relaxed sm:text-lg">
									{project.summary}
								</p>
							</div>

							<a
								href={project.link}
								class="border-sepia-dark text-sepia-dark hover:text-forest-green hover:border-forest-green inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 font-mono text-sm font-bold transition-colors"
								target="_blank"
								rel="noreferrer"
								aria-label={`Open source for ${project.title}`}
							>
								View Source
								<Icon name="arrow-up-right" />
							</a>
						</div>

						<div class="grid gap-4 md:grid-cols-3">
							<div class="border-sepia-light/40 bg-parchment/60 rounded-sm border p-4">
								<p class="font-mono text-sepia-dark text-xs font-bold tracking-[0.18em] uppercase">
									Challenge
								</p>
								<p class="text-sepia-light mt-3 text-sm leading-relaxed sm:text-base">
									{project.challenge}
								</p>
							</div>

							<div class="border-sepia-light/40 bg-parchment/60 rounded-sm border p-4">
								<p class="font-mono text-sepia-dark text-xs font-bold tracking-[0.18em] uppercase">
									Approach
								</p>
								<p class="text-sepia-light mt-3 text-sm leading-relaxed sm:text-base">
									{project.approach}
								</p>
							</div>

							<div class="border-sepia-light/40 bg-parchment/60 rounded-sm border p-4">
								<p class="font-mono text-sepia-dark text-xs font-bold tracking-[0.18em] uppercase">
									Why It Matters
								</p>
								<p class="text-sepia-light mt-3 text-sm leading-relaxed sm:text-base">
									{project.impact}
								</p>
							</div>
						</div>
					</div>

					<div class="border-sepia-light/40 bg-parchment/70 flex flex-col justify-between rounded-sm border p-5 sm:p-6">
						<div>
							<div class="text-forest-green bg-forest-green/10 inline-flex rounded-sm p-3">
								<Icon name="code" />
							</div>
							<h4 class="font-heading mt-5 text-xl font-bold">Stack Snapshot</h4>
							<p class="text-sepia-light mt-2 text-sm leading-relaxed sm:text-base">
								Tools chosen to match the constraint rather than force a one-stack-fits-all approach.
							</p>
						</div>

						<div class="mt-6 flex flex-wrap gap-2 sm:gap-3">
							{#each project.tags as tag (tag)}
								<span
									class="bg-forest-green/15 text-forest-green rounded-full px-3 py-1.5 font-mono text-xs font-bold sm:text-sm"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</Card>
			{/each}
		</div>

		<div class="mt-16 sm:mt-20">
			<div class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<p class="text-forest-green font-mono text-xs font-bold tracking-[0.18em] uppercase sm:text-sm">
						More Work
					</p>
					<h3 class="font-heading mt-2 text-2xl font-bold sm:text-3xl">Smaller Builds, Same Intent</h3>
				</div>

				<a
					href="https://github.com/PumPum7?tab=repositories"
					target="_blank"
					rel="noreferrer"
					class="group bg-parchment border-sepia-dark text-sepia-dark font-heading inline-flex items-center gap-2 rounded-sm border-2 px-6 py-3 text-base font-bold shadow-lg transition-all hover:-translate-y-1 sm:gap-3"
				>
					<span>See All Projects</span>
					<Icon name="arrow-up-right" />
				</a>
			</div>

			<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
				{#each projectNotes as project (project.title)}
					<Card class="flex h-full flex-col">
						<h4 class="font-heading text-xl font-bold sm:text-2xl">{project.title}</h4>
						<p class="text-sepia-light mt-3 grow text-base leading-relaxed">{project.desc}</p>
						<p class="text-sepia-dark/80 mt-5 border-sepia-light/40 border-t pt-4 font-mono text-sm leading-relaxed">
							{project.focus}
						</p>
						<div class="mt-5 flex flex-wrap gap-2">
							{#each project.tags as tag (tag)}
								<span class="bg-sepia-dark/8 text-sepia-dark rounded-full px-3 py-1 font-mono text-xs font-bold">
									{tag}
								</span>
							{/each}
						</div>
						<a
							href={project.link}
							target="_blank"
							rel="noreferrer"
							class="text-forest-green mt-6 inline-flex items-center gap-2 font-mono text-sm font-bold"
							aria-label={`Open source for ${project.title}`}
						>
							Source
							<Icon name="arrow-up-right" />
						</a>
					</Card>
				{/each}
			</div>
		</div>
	</div>
</Section>
