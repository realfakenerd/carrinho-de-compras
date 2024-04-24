import { db } from '$lib/db';
import type { PageLoad } from './$types';
import { liveQuery } from 'dexie';

export const load = (async () => {
	const produtos = liveQuery(() => db.produtos.toArray());
	const categorias = liveQuery(() => db.categorias.toArray());
	const mercados = liveQuery(() => db.mercado.toArray());

	return {
		produtos,
		categorias,
		mercados
	};
}) satisfies PageLoad;
