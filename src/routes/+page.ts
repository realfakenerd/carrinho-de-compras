import db from '$lib/db';
import type { Mercado } from '$lib/db_schema';
import { collection, getDocs } from 'firebase/firestore';
import type { LayoutLoad as PageLoad } from './$types';

export const load = (async () => {

	const mercadoCol = collection(db, 'mercado');
    const mercadoSnapshot = await getDocs(mercadoCol);
    const mercadoList = mercadoSnapshot.docs.map(doc => ({
		id: doc.id,
		nome: doc.data().nome,
		criado_em: doc.data().criado_em,
		preco: doc.data().preco
	})) satisfies Mercado[]
	

	
	return {
		mercado: mercadoList 
	};
}) satisfies PageLoad;
