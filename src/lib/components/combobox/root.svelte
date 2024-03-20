<script lang="ts">
	import { createCombobox } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
	import { key } from './index';
	import type { Carrinho } from '$lib/types';

	const ctx = createCombobox<Carrinho>();
	setContext(key, ctx);
</script>

<slot />
