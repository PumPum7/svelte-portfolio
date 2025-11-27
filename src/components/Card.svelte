<script lang="ts">
	const { class: className, children } = $props<{
		class?: string;
		children?: () => any;
	}>();
</script>

<div
	class="group relative rounded-sm p-5 transition-all duration-300 sm:p-6 md:p-8 {className} bg-card-bg border-sepia-light shadow-box-shadow border-2"
>
	<!-- Decorative corner flourishes -->
	<div
		class="border-sepia-light absolute top-1 left-1 h-3 w-3 border-t-2 border-l-2 sm:h-4 sm:w-4"
	></div>
	<div
		class="border-sepia-light absolute top-1 right-1 h-3 w-3 border-t-2 border-r-2 sm:h-4 sm:w-4"
	></div>
	<div
		class="border-sepia-light absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 sm:h-4 sm:w-4"
	></div>
	<div
		class="border-sepia-light absolute right-1 bottom-1 h-3 w-3 border-r-2 border-b-2 sm:h-4 sm:w-4"
	></div>

	{@render children?.()}
</div>
