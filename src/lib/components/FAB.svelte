<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Icon from './Icon.svelte';
	export let d = '';

	let mounted = false;
	onMount(() => (mounted = true));
</script>

{#if mounted}
	<button 
        in:fade={{delay: 300,duration: 600}} 
        class="fixed bottom-24 right-4 z-50 h-14 w-14 rounded-2xl bg-primary p-4 transition shadow-sm hover:bg-primary/80 hover:shadow-md hover:-translate-y-1"
    >
		<Icon {d} />
	</button>
{/if}
