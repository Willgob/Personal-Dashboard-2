<script>
	let { showModal = $bindable(), selectedWidget = $bindable(), data = {}, onclose } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => {
		showModal = false;
		onclose?.();
	}}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div>
		<h2 style="color: #fff">Settings</h2>
		<hr />
		{#if selectedWidget}
			<p style="color: #fff">Widget ID: {selectedWidget.id}</p>
			<form method="post" action="?/updateWidget">
				<input type="hidden" name="widgetId" value={selectedWidget.id} />
				<span style="color: #fff">X:</span>
				<input type="number" name="x" placeholder={selectedWidget.x} min="0" max="12" />
				<br />
				<span style="color: #fff">Y:</span>
				<input type="number" name="y" placeholder={selectedWidget.y} min="0" max="12" />
				<br />
				<span style="color: #fff">Width:</span>
				<input type="number" name="width" placeholder={selectedWidget.width} min="0" max="12" />
				<br />
				<span style="color: #fff">Height:</span>
				<input type="number" name="height" placeholder={selectedWidget.height} min="0" max="12" />
				{#if selectedWidget.type === 'clock'}
					<br />
					<span style="color: #fff">Time Format:</span>
					<select name="Time Format"> 
						<option value="h12" selected={selectedWidget.timeFormat === 'h12'}>12-hour</option>
						<option value="h24" selected={selectedWidget.timeFormat === 'h24'}>24-hour</option>
					</select>	
					<br />
					<!-- <span style="color: #fff">Time Zone:</span>
					<select name="Time Zone">
						<option value="local" selected={selectedWidget.timeZone === 'local'}>Local</option>
						<option value="utc" selected={selectedWidget.timeZone === 'utc'}>UTC</option>
					</select> -->
				{/if}
				<hr />
				<button class="button" type="submit">Save</button>
			</form>
		{:else}
			<form method="post" action="?/setFont">
				<input type="url" name="font" placeholder={data?.data?.theme.font ?? 'No font set'} />
				<input
					type="text"
					name="font_name"
					placeholder={data?.data?.theme.font_name ?? 'No font name set'}
				/>
				<button class="button">Save Font</button>
			</form>
		{/if}
		<hr />
		<span style="display: flex; gap: 0.67rem;">
			<!-- svelte-ignore a11y_autofocus -->
			<button autofocus onclick={() => dialog.close()} class="button">close modal</button>
			<form method="post" action="?/signOut">
				<button class="button">Sign out</button>
			</form>
		</span>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.5em;
		border: none;
		padding: 0;
		background-color: #000;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(3px);
		-webkit-backdrop-filter: blur(3px);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 1s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
