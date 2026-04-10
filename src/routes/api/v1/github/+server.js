import { json } from '@sveltejs/kit';

export async function GET({fetch, url }) {
    const user = url.searchParams.get('user');
    const token = url.searchParams.get('token');
    console.log('Received GET request with user:', user, 'and token:', token);

    let endpoint = 'https://api.github.com/users/' + user;

    const response = await fetch(endpoint, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "User-Agent" : "Lumen"
        }
    });
    
    const data = await response.json();
    return json({ data });
}
