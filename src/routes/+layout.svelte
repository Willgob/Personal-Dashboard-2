<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './main.css';
	import './layout.css';
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let { children, data } = $props();

	$effect(() => {
		if (!browser) return;

		document.documentElement.style.setProperty(
			'--background-color',
			data.theme?.primary ?? '#0f0f0f'
		);

		document.documentElement.style.setProperty('--text-color', data.theme?.secondary ?? '#E2E2E2');

		document.documentElement.style.setProperty(
			'--widget-background',
			data.theme?.widget_background ?? '#E2E2E2'
		);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if page.url.pathname !== '/home'}
	<div class="navbar">
		<div class="navbar-div"><a href={resolve('/')}>Home</a></div>
		<div class="navbar-div"><a href={resolve('/login')}>Login</a></div>
		<div class="navbar-div"><a href={resolve('/home')}>Dashboard</a></div>
	</div>
	<div class="navbar-line"></div>
{/if}

{@render children()}
