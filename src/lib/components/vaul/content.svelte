<script lang="ts">
	import { cn } from '$lib/utils';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';

	type $$Props = DrawerPrimitive.ContentProps;

	export let className: $$Props['class'] = '';
	export { className as class };
</script>

<DrawerPrimitive.Portal>
	<DrawerPrimitive.Overlay class="fixed inset-0 bg-surface/95" />
	<DrawerPrimitive.Content
		style="translate: -50%"
		{...$$restProps}
		class={cn(
			'fixed flex flex-col left-1/2 bottom-0 z-50 bg-surface-variant h-full max-h-[96%] w-full max-w-[640px] rounded-t-xl'
		)}
	>
		<div class={cn("overflow-auto flex flex-col gap-4 py-6 px-4", className)}>
			<slot />
		</div>
	</DrawerPrimitive.Content>
</DrawerPrimitive.Portal>
