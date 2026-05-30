<script>
	import Clock from './clock.svelte';
	const { widget, editMode = false, onclick } = $props();
	import './style.css';
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->

<div
	class="widget"
	class:edit-mode={editMode}
	style="grid-column: {widget.x} / span {widget.width}; grid-row: {widget.y} / span {widget.height};"
	onclick={editMode ? onclick : undefined}
>
	{#if widget.type === 'clock'}
		<Clock {widget}/>
	{/if}
</div>
