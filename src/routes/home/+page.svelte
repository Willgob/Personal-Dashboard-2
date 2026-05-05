<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
	import Modal from '$lib/Modal.svelte';

	import Widget from '$lib/Widgets/template.svelte';
	import type { WidgetData } from '$lib/Widgets/template.svelte';
	const widgets = $derived((data.data?.widgets ?? []) as WidgetData[]);

	import openHeader from '$lib/assets/openheader.svg';
	import closeHeader from '$lib/assets/closeheader.svg';

	const { data }: { data: PageServerData } = $props();
	let showModal = $state(false);
	let showHeader = $state(true);

	let editMode = $state(false);
	let selectedWidget = $state<WidgetData | null>(null);

	import './page.css';

	function onWidgetClick(widget: WidgetData) {
		if (!editMode) return;
		selectedWidget = widget;
		showModal = true;
	}

</script>

<div class="main">
	<!-- Top Header -->
	<button class="hide-header" onclick={() => (showHeader = !showHeader)}>
		{#if showHeader}
			<img src={closeHeader} alt="close header" width="16" height="16" />
		{:else}
			<img src={openHeader} alt="open header" width="16" height="16" />
		{/if}
	</button>

	{#if showHeader}
		<header class="main-header">
			<span class="name">Welcome Back {data.user.name}</span>
			<button
				class="button settings-button"
				id="OpenSettingsModal"
				onclick={() => (showModal = true)}
			>
				Settings
			</button>
			<button class="button" onclick={() => (editMode = !editMode)}>
				{#if editMode}
					Save
				{:else}
					Edit
				{/if}
			</button>
		</header>
	{/if}

	<!-- all widgets go here -->
	<div class="grid" class:edit-mode={editMode}>
		{#each widgets as widget (widget.id)}
			<Widget {widget} {editMode} onclick={() => onWidgetClick(widget)}/>
		{/each}
	</div>
</div>

<Modal bind:showModal>
	{#snippet header()}
		<h2 style="color: #fff">Settings</h2>
	{/snippet}

	{#if selectedWidget}
		<p style="color: #fff">Widget ID: {selectedWidget.id}</p>
	{:else}
		<form method="post" action="?/setFont">
			<input type="url" name="font" placeholder={data.data?.theme.font ?? 'No font set'} />
			<input
				type="text"
				name="font_name"
				placeholder={data.data?.theme.font_name ?? 'No font name set'}
			/>
			<button class="button">Save Font</button>
		</form>
	{/if}

	<!-- <form method="post" action="?/setFont">
		<input type="number" name="font" placeholder={data.data?.widget ?? 'No font set'} />
		<button class="button">Save Font</button>
	</form> -->
</Modal>
