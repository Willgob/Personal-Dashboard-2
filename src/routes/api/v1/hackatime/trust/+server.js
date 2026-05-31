import { json } from '@sveltejs/kit';

export async function GET({fetch, url}) {
    const user = url.searchParams.get('user');
    console.log('Received GET request with user:', user);

    let endpoint = 'https://hackatime.hackclub.com/api/v1/users/' + user + '/trust_factor';

    const response = await fetch (endpoint, {
        headers: {
            "User-Agent" : "Lumen"
        }
    });

    const data = await response.json();
    return json({ data });
}