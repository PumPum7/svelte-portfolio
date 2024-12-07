<script lang="ts">
	export let className: string;
	export let isLink = false;
	export let link = '';
	export let handlerFunction = () => '';
	export let buttonType: 'button' | 'submit' | 'reset' = 'button';
</script>

{#if isLink}
	<a class={className} href={link} rel="noopener noreferrer" target="_blank">
		<slot />
	</a>
{:else}
	<button class={className} on:click={handlerFunction} type={buttonType}>
		<slot />
	</button>
{/if}

<style lang="scss">
	@use '../../variables' as var;

	a,
	button {
		color: var.$lighter-wood;
		padding: 11px 16px;
		border-radius: 12px;
		background-color: rgb(var.$lighter-wood, 10%);
		text-decoration: none;
		font-weight: 500;

		display: flex;
		align-items: center;

		&:hover {
			transform: scale(1.05);
			transition: transform 0.3s;
			box-shadow: 0 2px 40px -4px var.$wood-brown;
		}

		&.github {
			max-width: fit-content;
		}
	}
</style>
