<script lang="ts">
	import favicon from '$lib/assets/favicon.png';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div style="
	--background-color: {data.theme?.primary ?? '#fff'};
	">
	{@render children()}
</div>
