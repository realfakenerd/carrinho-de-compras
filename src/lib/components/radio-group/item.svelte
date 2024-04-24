<script lang="ts">
	import { melt, type RadioGroup } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { key } from './index';

	interface Prop {
		option: string;
		label?: string;
		value: string;
	}

	const {
		elements: { item },
		helpers: { isChecked },
		states: { value: localValue }
	} = getContext<RadioGroup>(key);

	let { option, label, value = $bindable() }: Prop = $props();
	$effect(() => {
		value = $localValue;
	});
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
