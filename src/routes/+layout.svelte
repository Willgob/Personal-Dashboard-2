<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './main.css';
	import './layout.css'
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	let { children, data } = $props();

	$effect(() => {
		if (!browser) return;

		document.documentElement.style.setProperty('--background-color', data.theme?.primary ?? 'rgb(255,255,255)');
		document.documentElement.style.setProperty('--text-color', data.theme?.secondary ?? '#111');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if page.url.pathname !== '/home'}
<div class="navbar">
	<div class="navbar-div"><a href="/">Home</a></div>
	<div class="navbar-div"><a href="/login">Login</a></div>
	<div class="navbar-div"><a href="/home">Dashboard</a></div>
</div>
<div class="navbar-line"></div>
{/if}

{@render children()}

