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

	return { user: event.locals.user, data};
	
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

	encryptKey: async (event) => {
			await addData(event.locals, {
				Keys: {
					encryptedToken: encrypt('gg IS A TEST SECRET KEY')
				}
			});
			return { success: true };
		
	},

	removePressed: async (event) => {
		const formData = await event.request.formData();
		const key = formData.get('key') as string;
		const value = formData.get('value') as string | null;
		// If a value is provided, remove just that item from the array; otherwise delete the whole key
		const toRemove = value ? { [key]: [value] } : { [key]: null };
		await removeData(event.locals, toRemove);
		return { success: true };
	},

	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		return redirect(302, '/login');
	}
};
