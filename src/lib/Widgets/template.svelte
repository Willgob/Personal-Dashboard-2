<script>
	import Clock from './clock.svelte';
	const { widget, editMode = false, onclick } = $props();
	import './style.css';
</script>

<div
	class="widget"
	class:edit-mode={editMode}
	style="grid-column: {widget.x} / span {widget.width}; grid-row: {widget.y} / span {widget.height};"
	onclick={editMode ? onclick: undefined}
>
	{#if widget.type === 'clock'}
		<Clock />
	{/if}
</div>
