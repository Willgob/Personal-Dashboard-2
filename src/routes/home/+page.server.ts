import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { addData, removeData, getData } from '$lib/server/data';
import { encrypt, decrypt } from '$lib/server/encryption.js';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
	const data = await getData(event.locals);

	return { user: event.locals.user, data };
};

export const actions: Actions = {
	addPressed: async (event) => {
		await addData(event.locals, {
			Theme: {
				primary: '#333'
			}
		});
		return { success: true };
	},

	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		return redirect(302, '/login');
	},

	setFont: async (event) => {
		const formData = await event.request.formData();
		const font = formData.get('font') as string;
		const font_name = formData.get('font_name') as string;
		console.log(font);
		await addData(event.locals, {
			theme: {
				font,
				font_name
			}
		});
		return redirect(302, '/home');
	}
};
