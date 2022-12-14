import supabase from '$lib/supa';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	let { data: mercado, error } = await supabase
  .from('mercado')
  .select('*')
    console.log(mercado);
    
	return json(mercado);
}) satisfies RequestHandler;
