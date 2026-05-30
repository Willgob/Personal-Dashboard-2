<script>
	import { onMount, onDestroy } from 'svelte';
	const {widget} = $props();

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

	const timezone = $derived(Intl.DateTimeFormat().resolvedOptions().timeZone);

	const hours = $derived(
		widget?.timeFormat === "h12"
		? (time.getHours() % 12 || 12).toString().padStart(2, '0')
		: time.getHours().toString().padStart(2, '0')
	);
	const minutes = $derived(time.getMinutes().toString().padStart(2, '0'));
	const seconds = $derived(time.getSeconds().toString().padStart(2, '0'));
	const ampm = $derived(widget?.timeFormat === "h12" ? (time.getHours() >= 12 ? 'PM' : 'AM') : '');
	const date = $derived(
		time.toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' })
	);
</script>

<div class="time">{hours}:{minutes}:{seconds} {ampm} {date}</div>
<!-- <pre style="color:white">{JSON.stringify(widget, null, 2)}</pre> -->