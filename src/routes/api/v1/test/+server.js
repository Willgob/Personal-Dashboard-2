import { json } from '@sveltejs/kit';

export function GET() {
    const test = Math.random();
    return json({ message: `Hello from the server! Here's a random number: ${test}` });
}