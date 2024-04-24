<script lang="ts">
	import { cn } from '$lib/utils.svelte';
	import Icon from '@iconify/svelte';
	import { melt, type Combobox } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import { key } from './index';

	const {
		elements: { input, label },
		states: { open }
	} = getContext<Combobox>(key);

	let className: string | null | undefined = '';
	export { className as class };
	export let labelText = '';

	export let value: string;
</script>

<div>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label use:melt={$label} class="text-label-large">{labelText}</label>
	<div>
		<input
			on:input
			bind:value
			type="text"
			use:melt={$input}
			class={cn(
				`w-full rounded-full border-none bg-surface-variant 
		pl-4 ring-1 ring-on-surface-variant  transition py-2`,
				className
			)}
		/>
		<div>
			{#if $open}
				<Icon icon="mdi:chevron-up" />
			{:else}
				<Icon icon="mdi:chevron-down" />
			{/if}
		</div>
	</div>
</div>

<style>
	input:not(input[type='radio']):placeholder {
		@apply text-on-surface-variant;
	}
	input:not(input[type='radio']):focus {
		@apply bg-surface-1 ring-2 ring-on-surface-variant;
	}
</style>
