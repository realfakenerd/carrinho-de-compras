import type { DocumentData } from 'firebase/firestore';
import type { LayoutLoad } from './$types';
import mercado from '$lib/stores/mercado.store'
interface Mercado extends DocumentData {
	id: string;
	criado_em: string;
	nome: string;
	preco: string;
}

export const load = (async ({ url }) => {
	return {
		currentRoute: url.pathname,
		mercado
	};
}) satisfies LayoutLoad;
