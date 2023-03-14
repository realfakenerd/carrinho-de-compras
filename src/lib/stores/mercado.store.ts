import { db } from '$lib/firebase';
import { collection, CollectionReference } from 'firebase/firestore';
import { collectionStore } from 'sveltefire';
import type {Mercado} from '../types';

const enum ItemTipo {
	UNIDADE,
	KILO
}

const mercRef = collection(db, 'mercado');
const mercado = collectionStore<Mercado>(db, mercRef, []);
export default mercado;

export {mercRef, ItemTipo};
export type { Mercado};