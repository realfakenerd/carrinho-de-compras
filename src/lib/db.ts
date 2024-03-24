import Dexie, { type Table } from 'dexie';
import type { Mercado } from './types';

export class MercadoDatabase extends Dexie {
	mercado!: Table<Mercado, string>;

	constructor() {
		super('mercado');
		this.version(1).stores({
			mercado: '++id, nome, preco, img, tipo'
		});
	}
}

export async function addItemToMercado({ nome, preco, img, tipo }: Mercado) {
	try {
		const id = await db.mercado.add({ nome, preco, img, tipo });
		return id;
	} catch (error) {
		console.log(error);
	}
}

export const db = new MercadoDatabase();
