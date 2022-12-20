import { collection, getFirestore } from 'firebase/firestore';
import firebase from './firebase';

const db = getFirestore(firebase);
export const mercadoRef = collection(db, 'mercado');
export default db;
