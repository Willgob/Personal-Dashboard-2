import {redirect, error } from '@sveltejs/kit';
import { getData } from '$lib/server/data';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    }
    const data = await getData(event.locals);

    if (!data?.admin) {
        throw error(403, 'Access denied');
    }

    return { user: event.locals.user, data };
    
    
};