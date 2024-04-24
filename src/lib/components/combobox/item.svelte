<script lang="ts">
	import { cn } from '$lib/utils.svelte';
	import { melt, type Combobox, type ComboboxOptionProps } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import { key } from './index';
	import type { Carrinho } from '$lib/types';
	import type { UnsplashResult } from '../drawer';

	function toOption<T extends UnsplashResult>(option: T): ComboboxOptionProps<T> {
		return {
			value: option,
			label: '',
			disabled: false
		};
	}

	const {
		elements: { option }
	} = getContext<Combobox>(key);

	export let className = '';
	export { className as class };
	export let value: UnsplashResult;
</script>

<li use:melt={$option(toOption(value))} class={cn(className)}>
	<slot />
</li>
