<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import './main.css';
	import { browser } from '$app/environment';

	let { children, data } = $props();

	$effect(() => {
		if (!browser) return;

		document.documentElement.style.setProperty('--background-color', data.theme?.primary ?? 'rgb(255,255,255)');
		document.documentElement.style.setProperty('--text-color', data.theme?.secondary ?? '#fff');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}


