import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { addData, removeData, getData, updateWidget } from '$lib/server/data';
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
	},

	setWidgetX: async (event) => {
		const formData = await event.request.formData();
		const widgetId = formData.get('widgetId') as string;
		const newX = Number(formData.get('setWidgetX'));

		await addData(event.locals, {
			widgets: [
				{
					id: widgetId,
					x: newX
				}
			]
		});
		return redirect(302, '/home');
	},

	updateWidget: async (event) => {
		const formData = await event.request.formData();
		const widgetID = formData.get('widgetId') as string;

		const updates: Record<string, unknown> = {};

		const x = Number(formData.get('x'));
		const y = Number(formData.get('y'));
		const width = Number(formData.get('width'));
		const height = Number(formData.get('height'));
		const timeFormat = formData.get('Time Format') as string;

		if (x) updates.x = Number(x);
		if (y) updates.y = Number(y);
		if (width) updates.width = Number(width);
		if (height) updates.height = Number(height);
		if (timeFormat) updates.timeFormat = timeFormat;

		await updateWidget(event.locals, widgetID, updates);
		return redirect(302, '/home');
	}
};
