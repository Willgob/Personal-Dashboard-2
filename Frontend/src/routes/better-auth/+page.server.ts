import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { getData } from '$lib/server/data';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/better-auth/login');
	}
	const data = await getData(event.locals);
	return { user: event.locals.user, data };
	
};

export const actions: Actions = {
	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		return redirect(302, '/better-auth/login');
	}
};
