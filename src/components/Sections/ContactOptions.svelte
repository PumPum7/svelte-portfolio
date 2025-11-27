<script lang="ts">
	import Section from './Section.svelte';
	import Icon from '../Icon.svelte';
</script>

<Section id="contact">
	<div class="mx-auto max-w-4xl pb-12 text-center sm:pb-16 md:pb-20">
		<h2 class="font-heading mb-8 text-3xl font-bold sm:mb-10 sm:text-4xl md:text-5xl">
			Get in Touch
		</h2>
		<p
			class="text-sepia-light mx-auto mb-12 max-w-xl px-4 text-lg leading-relaxed sm:mb-16 sm:text-xl"
		>
			Whether you have a project in mind or just want to chat about code or cuisine, feel free to
			reach out.
		</p>
		<div
			class="flex flex-col items-stretch justify-center gap-4 px-4 sm:flex-row sm:items-center sm:gap-6 md:gap-8"
		>
			<a
				href="https://twitter.com/Officer_Pum"
				target="_blank"
				rel="noreferrer"
				class="group bg-background border-sepia-light text-sepia-dark flex w-full items-center justify-center gap-3 rounded-sm border-2 px-6 py-4 shadow-lg transition-all hover:-translate-y-1 sm:w-auto sm:gap-4 sm:px-8 sm:py-5"
			>
				<Icon name="twitter-icon" />
				<span class="font-heading text-sm font-bold sm:text-base">@Officer_Pum</span>
			</a>

			<a
				href="https://github.com/PumPum7"
				target="_blank"
				rel="noreferrer"
				class="group bg-background border-sepia-light text-sepia-dark flex w-full items-center justify-center gap-3 rounded-sm border-2 px-6 py-4 shadow-lg transition-all hover:-translate-y-1 sm:w-auto sm:gap-4 sm:px-8 sm:py-5"
			>
				<Icon name="github-mark" />
				<span class="font-heading text-sm font-bold sm:text-base">GitHub</span>
			</a>
			<div
				class="group bg-background border-sepia-light text-sepia-dark flex w-full cursor-pointer items-center justify-center gap-3 rounded-sm border-2 px-6 py-4 shadow-lg transition-all hover:-translate-y-1 sm:w-auto sm:gap-4 sm:px-8 sm:py-5"
			>
				<Icon name="discord" />
				<span class="font-heading text-sm font-bold sm:text-base">@PumPum7</span>
			</div>
		</div>

		<div
			class="border-sepia-dark/20 text-sepia-light mt-16 flex flex-col items-center gap-3 border-t pt-8 text-sm sm:mt-20 sm:gap-4 sm:pt-10 sm:text-base md:mt-24"
		>
			<Icon name="footer-icon" />
			<p class="font-heading">&copy; {new Date().getFullYear()} Michael (Pum). Made in the Alps.</p>
		</div>
	</div>
</Section>
