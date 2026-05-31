import { json } from '@sveltejs/kit';

export async function GET({fetch, url}) {
    const user = url.searchParams.get('user');
    const api = url.searchParams.get('api');
    console.log('Received GET request with user:', user);

    let endpoint = 'https://hackatime.hackclub.com/api/hackatime/v1/users/' + user + '/statusbar/today';

    const response = await fetch (endpoint, {
        headers: {
            "User-Agent" : "Lumen",
            "Authorization": `Bearer ${api}`
        }
    });

    const data = await response.json();
    return json({ data });
}