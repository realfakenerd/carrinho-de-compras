<script lang="ts">
	import { cn } from '$lib/utils.svelte';
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	import { fade } from 'svelte/transition';

	let mounted = $state(false);
	$effect(() => {
		mounted = true;
	});
	let {
		onclick,
		class: className = '',
		children
	}: {
		class?: string;
		children: Snippet;
		onclick: MouseEventHandler<HTMLButtonElement>;
	} = $props();
</script>

{#if mounted}
	<button
		{onclick}
		in:fade={{ delay: 300, duration: 600 }}
		class={cn(
			'h-14 rounded-2xl text-on-primary bg-primary p-4 shadow-sm transition hover:-translate-y-1 hover:bg-primary/90 hover:shadow-md',
			className
		)}
	>
		{@render children()}
	</button>
{/if}
