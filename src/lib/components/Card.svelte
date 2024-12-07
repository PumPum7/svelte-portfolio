<script lang="ts">
	export let title = '';
	export let hasAnimation = false;
</script>

<div>
	{#if title !== ''}
		<h2>{title}</h2>
	{/if}
	<div class={`card ${hasAnimation ? 'animation' : ''}`}>
		<slot />
	</div>
</div>

<style lang="scss">
	@use '../../variables' as var;

	.card {
		backdrop-filter: blur(1);
		box-shadow: 0.5px 1px 1px hsl(223deg 5% 80% / 0.333);
		border-radius: 16px;
		border: 0.5px solid rgba(var.$wood-brown, 5%);
		padding: 16px 22px;
		background-color: var(--foreground-color);
	}

	.animation:hover {
		box-shadow: 1px 2px 2px hsl(223deg 5% 70% / 0.5);
		transform: translateY(-2px);
	}
</style>
