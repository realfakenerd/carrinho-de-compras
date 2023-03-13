import type { LayoutLoad } from './$types';
import mercado from '$lib/stores/mercado.store';
export const load = (async ({ url }) => {
	return {
		currentRoute: url.pathname,
		mercado
	};
}) satisfies LayoutLoad;
