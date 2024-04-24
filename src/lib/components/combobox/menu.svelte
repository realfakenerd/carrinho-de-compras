<script lang="ts">
	import { cn } from '$lib/utils.svelte';
	import { getContext } from 'svelte';
	import { key } from './index';
	import { melt, type Combobox } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';

	const {
		elements: { menu },
		states: { open }
	} = getContext<Combobox>(key);

	let className: string | null | undefined = '';
	export { className as class };
</script>

{#if $open}
	<ul transition:fly use:melt={$menu} class={cn(className)}>
		<slot />
	</ul>
{/if}
