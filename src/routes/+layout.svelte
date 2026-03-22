<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import './main.css';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	onMount(() => {
		document.documentElement.style.setProperty('--background-color', data.theme?.primary ?? 'rgb(255,255,255)');
		document.documentElement.style.setProperty('--text-color', data.theme?.secondary ?? '#000');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}


