<script lang="ts">
	import { cn } from '$lib/utils';
	import { createRadioGroup, melt } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
	import { key } from './index';

	/** Default value for the radio group. */
	export let defaultValue: string | undefined = undefined;

	const ctx = createRadioGroup({
		defaultValue
	});

	setContext(key, ctx);

	const {
		elements: { root, hiddenInput }
	} = ctx;

	/** Additional classes applied to the root element. */
	export let className: string | undefined = '';
	export { className as class };
</script>

<ul use:melt={$root} class={cn('flex flex-col gap-y-3', className)}>
	<slot />
	<input use:melt={$hiddenInput} />
</ul>
