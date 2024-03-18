<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Icon from '@iconify/svelte';

	let mounted = false;
	onMount(() => (mounted = true));
</script>

{#if mounted}
	<button
		on:click
		in:fade={{ delay: 300, duration: 600 }}
		class="fixed bottom-24 right-4 z-50 h-14 w-14 rounded-2xl text-on-primary bg-primary p-4 shadow-sm transition hover:-translate-y-1 hover:bg-primary/90 hover:shadow-md"
	>
		<Icon icon="mdi:plus"  width="24px"/>
	</button>
{/if}
