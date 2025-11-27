<script lang="ts">
	const {
		id,
		class: className,
		children
	} = $props<{
		id?: string;
		class?: string;
		children?: () => any;
	}>();
</script>

<section {id} class="relative min-h-screen px-4 py-16 sm:px-6 sm:py-20 md:py-24 {className}">
	{@render children?.()}
	<div
		class="via-sepia-dark absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent opacity-30"
	></div>
</section>
