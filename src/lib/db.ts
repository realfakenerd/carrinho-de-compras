import Dexie, { type Table } from 'dexie';
// import { dexieCloud } from 'dexie-cloud-addon';
import type { Carrinho, Mercado } from './types';

export class MercadoDatabase extends Dexie {
	mercado!: Table<Mercado, string>;
	carrinho!: Table<Carrinho, string>;

	constructor() {
		super('mercado');
		this.version(1).stores({
			mercado: '@id, nome, preco, img, tipo',
			carrinho: '@id, nome, preco, quantidade, tipo'
		});

		/** this.cloud.configure({
			databaseUrl: 'https://zv2kkg59b.dexie.cloud',
			requireAuth: false,
			tryUseServiceWorker: true
		});*/
	}
}

const db = new MercadoDatabase();
export { db };

export async function addItemToMercado({ nome, preco, img, tipo }: Mercado) {
	const id = await db.mercado.add({
		nome,
		preco,
		img,
		tipo
	});
	return id;
}
