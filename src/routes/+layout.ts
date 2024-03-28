import type { LayoutLoad } from './$types';
export const load = (async ({ url }) => {
	return {
		currentRoute: url.pathname
	};
}) satisfies LayoutLoad;
