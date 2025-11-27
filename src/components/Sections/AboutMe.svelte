<script lang="ts">
	import Section from './Section.svelte';
	import Card from '../Card.svelte';
	import Icon from '../Icon.svelte';

	const SKILLS = {
		frontend: [
			{ name: 'TypeScript', level: 90 },
			{ name: 'React', level: 90 },
			{ name: 'Next.js', level: 85 },
			{ name: 'TailwindCSS', level: 95 },
			{ name: 'Svelte', level: 80 }
		],
		backend: [
			{ name: 'Rust', level: 80 },
			{ name: 'GoLang', level: 75 },
			{ name: 'Python', level: 85 },
			{ name: 'Node.js', level: 80 }
		],
		database: [
			{ name: 'PostgreSQL', level: 80 },
			{ name: 'MongoDB', level: 75 },
			{ name: 'FaunaDB', level: 70 },
			{ name: 'Redis', level: 60 }
		]
	};

	const interests = [
		{ icon: 'utensils', title: 'Cuisine', desc: 'Cooking & Recipes', color: 'text-deep-red' },
		{ icon: 'mountain', title: 'Alpinist', desc: 'Skiing & Hiking', color: 'text-forest-green' },
		{ icon: 'code', title: 'Developer', desc: 'Fullstack', color: 'text-gold' },
		{
			icon: 'database',
			title: 'Collector',
			desc: 'Sneakers & Digital Art',
			color: 'text-sepia-dark'
		}
	];

	const skillCategories = [
		{ title: 'Frontend', icon: 'code', skills: SKILLS.frontend },
		{ title: 'Backend', icon: 'server', skills: SKILLS.backend },
		{ title: 'Database', icon: 'database', skills: SKILLS.database }
	];
</script>

<Section id="about">
	<div class="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
		<div class="space-y-6 sm:space-y-8">
			<h2
				class="font-heading flex items-center gap-3 text-3xl font-bold sm:gap-4 sm:text-4xl md:text-5xl"
			>
				<div class="bg-forest-green/20 text-forest-green rounded-sm p-2 sm:p-3">
					<Icon name="about-me" />
				</div>
				About Me
			</h2>
			<div
				class="text-sepia-light space-y-4 text-base leading-relaxed sm:space-y-6 sm:text-lg sm:leading-loose"
			>
				<p>
					I'm Michael, also known as Pum. I am a fullstack developer based in Munich, spending much
					of my time in the Austrian Alps.
				</p>
				<p>
					My work combines solid backend architecture with responsive frontend development. I focus
					on creating reliable, scalable applications while keeping the user experience clean and
					intuitive.
				</p>
				<p>
					Outside of coding, I enjoy cooking, skiing in the mountains, and exploring the world of
					digital collectibles.
				</p>
			</div>
			<!-- Personal Interests Grid -->
			<div class="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6">
				{#each interests as item}
					<Card class="flex items-center gap-4 p-4 sm:gap-5 sm:p-5">
						<div class="bg-opacity-20 rounded-sm p-3 sm:p-4 {item.color} shrink-0">
							<Icon name={item.icon} />
						</div>
						<div class="min-w-0">
							<h4 class="font-heading text-base font-bold sm:text-lg">{item.title}</h4>
							<p class="text-sepia-light truncate font-mono text-xs sm:text-sm">{item.desc}</p>
						</div>
					</Card>
				{/each}
			</div>
		</div>
		<!-- Skills Visualization -->
		<div
			class="double border-sepia-light bg-background relative space-y-8 rounded-sm border-3 p-6 sm:space-y-12 sm:p-8"
		>
			<h3 class="font-heading mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl">
				Technical Skills
			</h3>

			<div class="space-y-8 sm:space-y-10">
				{#each skillCategories as category}
					<div>
						<div
							class="text-forest-green border-forest-green/40 mb-3 flex items-center gap-2 border-b pb-2 sm:mb-4 sm:gap-3"
						>
							<Icon name={category.icon} />
							<span class="font-heading text-lg font-bold sm:text-xl">{category.title}</span>
						</div>
						<div class="flex flex-wrap gap-2 sm:gap-3">
							{#each category.skills as skill}
								<span
									class="bg-parchment border-sepia-light text-sepia-dark rounded-sm border-2 px-3 py-1.5 font-mono text-xs font-bold shadow-sm transition-all hover:-translate-y-1 sm:px-4 sm:py-2 sm:text-sm"
								>
									{skill.name}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<!-- Decorative Seal -->
			<div
				class="bg-deep-red text-parchment double border-gold absolute -right-4 -bottom-4 flex h-16 w-16 rotate-12 items-center justify-center rounded-full border-4 shadow-lg sm:-right-6 sm:-bottom-6 sm:h-20 sm:w-20"
			>
				<Icon name="seal" />
			</div>
		</div>
	</div>
</Section>
