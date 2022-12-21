import { mercadoRef } from '$lib/db';
import type { DocumentData } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { startWith } from 'rxjs';

export interface Mercado extends DocumentData {
	id: string;
	criado_em: string;
	nome: string;
	preco: string;
}

const mercado = collectionData(mercadoRef).pipe(startWith([]));
export default mercado;
