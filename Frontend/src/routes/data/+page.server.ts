import { getData } from '$lib/server/data';

export const load = async ({ locals }) => {
    const data = await getData(locals);
    return { data };    
}