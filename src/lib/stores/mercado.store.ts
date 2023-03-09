import { db } from '$lib/firebase';
import { collection } from 'firebase/firestore';
import { collectionStore } from 'sveltefire';

export interface Mercado {
	id: string;
	criado_em: string;
	nome: string;
	preco: number;
}

const mercRef = collection(db, 'mercado')
const mercado = collectionStore<Mercado>(db, mercRef, [])
export default mercado;
