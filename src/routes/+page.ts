import { db } from '$lib/db';
import type { PageLoad } from './$types';
import { liveQuery } from 'dexie';

export const load = (async () => {
	const mercado = liveQuery(() => db.mercado.toArray());

	return {
		mercado
	};
}) satisfies PageLoad;
