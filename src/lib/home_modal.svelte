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
				<input type="number" name="x" class="number-input" placeholder={selectedWidget.x} min="0" max="12" />
				<br />
				<span style="color: #fff">Y:</span>
				<input type="number" name="y" class="number-input" placeholder={selectedWidget.y} min="0" max="12" />
				<br />
				<span style="color: #fff">Width:</span>
				<input type="number" name="width" class="number-input" placeholder={selectedWidget.width} min={selectedWidget.width_min} max="12" />
				<br />
				<span style="color: #fff">Height:</span>
				<input type="number" name="height" class="number-input" placeholder={selectedWidget.height} min={selectedWidget.height_min} max="12" />

				{#if selectedWidget.type === 'clock'}
					<br />
					<span style="color: #fff">Time Format:</span>
					<select class="dropdown" name="Time Format"> 
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

				{#if selectedWidget.type === 'hackatime'}
					<br />
					<span style="color: #fff">api:</span>
					<input type="text" name="api" class="number-input" placeholder={selectedWidget.location ?? 'Enter api'} />
					<input type="text" name="username" class="number-input" placeholder={selectedWidget.username ?? 'Enter username'} />
						<!-- <span style="color: #fff">Time Zone:</span> -->
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
				<br />
				<button class="button">Save Font</button>
			</form>
			<form method="post" action="?/addWidget">
				<button class="button" type="submit">Add Widget</button>
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
