<script lang="ts">
	import { cn } from '$lib/utils.svelte';
	import { Drawer } from 'vaul-svelte';

	export const className = '';
	export { className as class };
</script>

<Drawer.Trigger class={cn(className)}>
	<slot />
</Drawer.Trigger>
