<script lang="ts">
	import { cn } from '$lib/utils';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';

	type $$Props = DrawerPrimitive.ContentProps;

	export let className: $$Props['class'] = '';
	export { className as class };
</script>

<DrawerPrimitive.Portal>
	<DrawerPrimitive.Overlay class="fixed inset-0 bg-surface-2 bg-opacity-95" />
	<DrawerPrimitive.Content
		{...$$restProps}
		class={cn(
			'fixed inset-x-0 bottom-0 z-50 bg-surface-1 px-4 py-6 rounded-t-xl',
			className
		)}
	>
		<slot />
	</DrawerPrimitive.Content>
</DrawerPrimitive.Portal>
