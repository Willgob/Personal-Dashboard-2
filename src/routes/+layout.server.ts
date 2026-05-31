import type { LayoutServerLoad } from './$types';
import { getData } from '$lib/server/data';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = locals.session ?? null;

	if (!session) {
		return {
			session: null,
			theme: null
		};
	}

	const userData = await getData(locals);
	const theme = userData && typeof userData === 'object' && !Array.isArray(userData)
		? ((userData as Record<string, unknown>).theme as Record<string, string> ?? null)
		: null;

	console.log('Loaded session and theme:', { session, theme });
	return {
		session,
		theme
	};
};
