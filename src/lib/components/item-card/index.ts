import { db } from '$lib/db';
import type { Carrinho } from '$lib/types';
import ItemCard from './ItemCard.svelte';
export { default as carrinhoContas } from './store.svelte';

function addCarrinho({ nome, preco, tipo, quantidade = 1 }: Carrinho) {
	db.carrinho.add({ nome, preco, tipo, quantidade });
}

function deleteCarrinho(id: number) {
	db.carrinho.delete(id);
}

export { ItemCard, addCarrinho, deleteCarrinho };
