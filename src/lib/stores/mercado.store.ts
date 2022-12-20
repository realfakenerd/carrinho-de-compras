import { mercadoRef } from "$lib/db";
import { collectionData } from "rxfire/firestore";
import { startWith } from "rxjs";

const mercado = collectionData(mercadoRef).pipe(startWith([]))
export default mercado;