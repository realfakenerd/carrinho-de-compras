import { db } from '$lib/firebase';
import { CollectionReference, collection } from 'firebase/firestore';
import { collectionStore } from 'sveltefire';
import type { Mercado } from '../types';

const enum ItemTipo {
	UNIDADE = 'uni',
	KILO = 'kg'
}

const mercRef = collection(db, 'mercado') as CollectionReference<Mercado>;
const mercado = collectionStore<Mercado>(db, mercRef, []);

export default mercado;

export { ItemTipo, mercRef };
export type { Mercado };
