<script>
    import Clock from './clock.svelte';
    const {widget} = $props();
</script>

<div class="widget" style="grid-column: {widget.x} / span {widget.width}; grid-row: {widget.y} / span {widget.height};">
    {#if widget.type === 'clock'}
        <Clock />
    {/if}
</div>