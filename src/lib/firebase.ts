// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { browser } from '$app/environment';

const firebaseConfig = {
	apiKey: 'AIzaSyCneq-EFcWmsnH9kh-HqY1lwa3CJOUnWoc',
	authDomain: 'carrinho-de-compras-bb6ea.firebaseapp.com',
	projectId: 'carrinho-de-compras-bb6ea',
	storageBucket: 'carrinho-de-compras-bb6ea.appspot.com',
	messagingSenderId: '741230262562',
	appId: '1:741230262562:web:beb27f5f43810888528d7b',
	measurementId: 'G-S8X0QZYVM9'
} satisfies FirebaseOptions;

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'carrinho-de-compras');

const auth = getAuth(app);
const db = getFirestore(app);
const mercadoRef = collection(db, 'mercado');
if (browser) getAnalytics(app);

export { auth, db, mercadoRef };
export default app;
