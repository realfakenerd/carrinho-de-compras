import Dexie, { type DexieError, type Table } from 'dexie';
import type { Categoria, Mercado, Produto } from './types';
import { toast } from 'svelte-sonner';

class MercadoDatabase extends Dexie {
	mercado!: Table<Mercado, number>;
	carrinho!: Table<Produto, number>;
	categorias!: Table<Categoria, number>;
	produtos!: Table<Omit<Produto, 'quantidade'>, number>;

	constructor() {
		super('mercado');
		this.version(1).stores({
			mercado: '++id, nome, local, foto, *produtos',
			carrinho: '++id, nome, preco, tipo, foto, quantidade',
			produtos: '++id, nome, preco, tipo, foto, *categorias',
			categorias: '++id, nome, *produtos'
		});
	}
}

export const db = new MercadoDatabase();

export async function addItemToMercado({ nome, preco, foto, tipo }: Produto) {
	try {
		const id = await db.produtos.add({
			foto,
			nome,
			preco,
			tipo
		});

		return id;
	} catch (error) {
		const err = error as DexieError;
		toast.error(err.name, {
			description: err.message
		});
	}
}

export async function updateItemInMercado(
	id: number,
	{ nome, preco, foto, tipo }: Partial<Produto>
) {
	const rec = await db.produtos.update(id, {
		nome,
		foto,
		preco,
		tipo
	});

	return rec;
}
