<script lang="ts">
	const {
		name,
		class: className = '',
		...rest
	} = $props<{
		name: string;
		class?: string;
	}>();

	const icons = import.meta.glob('./icons/*.svg', {
		query: '?raw',
		eager: true,
		import: 'default'
	});

	const icon = icons[`./icons/${name}.svg`] as string | undefined;
</script>

<div class="inline-block {className}" {...rest}>
	{@html icon ?? ''}
</div>
