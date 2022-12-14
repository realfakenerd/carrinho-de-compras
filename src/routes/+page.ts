import supabase from '$lib/supa';
import type { LayoutLoad as PageLoad } from './$types';

export const load = (async () => {
	const { data: mercado, error } = await supabase.from('mercado').select('*');
	return {
        mercado,
        error
	};
}) satisfies PageLoad;
