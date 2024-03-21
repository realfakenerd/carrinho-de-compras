<script lang="ts">
	import { getContext } from 'svelte';
	import { key } from './index';
	import { melt, type RadioGroup } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	const {
		elements: { item },
		helpers: { isChecked },
		states: { value: localValue }
	} = getContext<RadioGroup>(key);

	export let option: string;
	export let label: string | undefined = option;
	export let value: string | any = '';

	$: value = $localValue;
</script>

<div class="flex items-center gap-3">
	<button use:melt={$item(option)} id={option} aria-labelledby="{option}-label">
		{#if $isChecked(option)}
			<div transition:fade={{ duration: 150 }} class="w-3 h-3 rounded-full bg-primary" />
		{/if}
	</button>
	<label
		class="text-label-medium capitalize text-on-surface-variant"
		for={label}
		id="{label}-label"
	>
		{label}
	</label>
</div>

<style>
	[data-melt-radio-group-item] {
		@apply rounded-full flex items-center justify-center cursor-default w-6 h-6 text-on-surface-variant transition ring-1 ring-on-surface-variant ease-in-out bg-transparent outline-none;
	}

	[data-state='checked'] {
		@apply bg-primary-container;
	}

	[data-melt-radio-group-item]:focus {
		@apply ring-primary-container;
	}
</style>
