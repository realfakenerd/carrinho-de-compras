import type { LayoutLoad } from './$types';
import { mercadoRef } from '$lib/db';
import type { DocumentData } from 'firebase/firestore';
import { collectionData } from '$lib/fixedRXFire';
import { startWith } from 'rxjs';
interface Mercado extends DocumentData {
	id: string;
	criado_em: string;
	nome: string;
	preco: string;
}

export const load = (async ({ url }) => {
	const mercado = collectionData(mercadoRef).pipe(startWith([]));
	return {
		currentRoute: url.pathname,
		mercado
	};
}) satisfies LayoutLoad;
