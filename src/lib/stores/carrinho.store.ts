import type { Carrinho } from '$lib/types';
import { writable } from 'svelte-local-storage-store';

const carrinho = writable<Carrinho[]>('carrinho', [], {
	storage: 'local'
});

export default carrinho;
