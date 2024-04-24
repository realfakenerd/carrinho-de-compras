<script lang="ts">
	import { cn } from '$lib/utils.svelte';
	import { createRadioGroup, melt } from '@melt-ui/svelte';
	import { setContext, type Snippet } from 'svelte';
	import { key } from './index';

	let {
		class: className = '',
		defaultValue,
		children
	}: { class?: string; defaultValue?: string; children: Snippet } = $props();

	const ctx = createRadioGroup({
		defaultValue
	});

	setContext(key, ctx);

	const {
		elements: { root, hiddenInput }
	} = ctx;
</script>

<ul use:melt={$root} class={cn('flex flex-col gap-y-3', className)}>
	{@render children()}
	<input use:melt={$hiddenInput} />
</ul>
