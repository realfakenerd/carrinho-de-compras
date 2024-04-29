import Dexie, { type Table } from 'dexie';
import { toast } from 'svelte-sonner';
import { mercadoDrawerState, produtoDrawerState } from './components/add-drawer';
import type { Carrinho, Categoria, Mercado, Produto } from './types';

class MercadoDatabase extends Dexie {
	mercado!: Table<Mercado, number>;
	carrinho!: Table<Carrinho, number>;
	categorias!: Table<Categoria, number>;
	produtos!: Table<Produto, number>;

	constructor() {
		super('mercado');
		this.version(1).stores({
			mercado: '++id, nome, local, *produtos',
			carrinho: '++id, nome, preco, tipo, quantidade',
			produtos: '++id, nome, preco, tipo, *categorias',
			categorias: '++id, nome, *produtos'
		});
	}
}

export const db = new MercadoDatabase();

class CustomError extends Error {
	constructor(name: string, message?: string) {
		super(message);
		this.name = name;
	}
}

/**
 * Adds a product to the mercado.
 *
 * @param produto - The product to be added.
 * @param produto.nome - The name of the product.
 * @param produto.preco - The price of the product.
 * @param produto.foto - The image URL of the product.
 * @param produto.tipo - The type of the product.
 * @throws If the nome or preco is not provided.
 * @return The ID of the added product.
 */
export async function addProdutoToMercado({ nome, preco, foto, tipo }: Produto) {
	try {
		if (!nome) throw new CustomError('SemNomeError', 'O nome do produto deve ser informado');
		if (!preco) throw new CustomError('SemPrecoError', 'O preço do produto deve ser informado');

		const id = await db.produtos.add({
			foto,
			nome,
			preco,
			tipo,
			categorias: [[0, '']]
		});

		toast.success('Adicionado com sucesso!', {
			description: `${nome}: R$ ${preco}`
		});

		produtoDrawerState.set(false);

		return id;
	} catch (error) {
		const err = error as Error;
		toast.error(err.name, {
			description: err.message
		});
	}
}

export async function addMercadoToDatabase({ nome, local, foto }: Mercado) {
	console.log({ nome, local, foto });
	try {
		if (!nome) throw new CustomError('SemNomeError', 'O nome do mercado deve ser informado');
		if (!local) throw new CustomError('SemLocalError', 'O local do mercado deve ser informado');

		const id = await db.mercado.add({
			foto: '',
			local,
			nome
		});

		mercadoDrawerState.set(false);

		return id;
	} catch (error) {
		const err = error as Error;
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
