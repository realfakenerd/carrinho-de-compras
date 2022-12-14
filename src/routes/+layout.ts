import supabase from '$lib/supa';
import type { LayoutLoad } from './$types';

export const load = (async ({ url }) => {
	const { data: mercado, error } = await supabase.from('mercado').select('*');
	return {
		currentRoute: url.pathname,
        mercado
	};
}) satisfies LayoutLoad;
