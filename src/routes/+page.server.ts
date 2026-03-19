import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    login: async () => {
        return redirect(302, '/login');
    }
};