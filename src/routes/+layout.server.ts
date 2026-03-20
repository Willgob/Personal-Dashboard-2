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
    const theme =
        userData && typeof userData === 'object' && !Array.isArray(userData)
            ? (userData as Record<string, unknown>).Theme as {primary: string, secondary: string} ?? null
            : null;

    return {
        session,
        theme
    };
};