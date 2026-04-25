<script>
	import { onMount, onDestroy } from 'svelte';

	let time = $state(new Date());
	let interval;

	onMount(() => {
		interval = setInterval(() => {
			time = new Date();
		}, 1000);
	});
	onDestroy(() => {
		clearInterval(interval);
	});

	const hours = $derived(time.getHours().toString().padStart(2, '0'));
	const minutes = $derived(time.getMinutes().toString().padStart(2, '0'));
	const seconds = $derived(time.getSeconds().toString().padStart(2, '0'));
	const date = $derived(
		time.toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' })
	);
</script>

<div class="test">test: {hours}:{minutes}:{seconds} {date}</div>
