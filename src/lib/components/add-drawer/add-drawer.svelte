<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Drawer, DrawerContent } from '../vaul';

	let { children, open = $bindable(false) }: { children: Snippet; open: boolean } = $props();
</script>

<Drawer bind:open>
	<DrawerContent>
		{@render children()}
	</DrawerContent>
</Drawer>
