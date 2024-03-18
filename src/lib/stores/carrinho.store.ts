import type { Carrinho } from '$lib/types';
import { persisted } from 'svelte-local-storage-store';

const carrinho = persisted<Carrinho[]>('carrinho', [], {
	storage: 'local'
});

export default carrinho;
