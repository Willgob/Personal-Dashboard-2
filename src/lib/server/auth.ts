import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { data } from '$lib/server/db/schema';

const SignupData = {
	theme: {
		font: 'https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap',
		font_name: 'Coming Soon',
		background: '#000',
		widget_background: '#ff4040'
	},
	widgets: [
		{
			x: 1,
			y: 1,
			id: '1',
			name: 'Clock',
			type: 'clock',
			width: 1,
			height: 1
		}
	]
};

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'pg' }),
	emailAndPassword: { enabled: true },
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET
		},
		
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET
		}
	},
	databaseHooks: {
		session: {
			create: {
				after: async (session) => {
					await db
						.insert(data)
						.values({userId: session.userId, data: SignupData })
						.onConflictDoNothing({ target: data.userId });
				}
			}
		}
	},
	plugins: [sveltekitCookies(getRequestEvent)] // make sure this is the last plugin in the array
});
