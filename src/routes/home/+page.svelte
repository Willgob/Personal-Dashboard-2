<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
	import Modal from '$lib/Modal.svelte';

	const { data }: { data: PageServerData } = $props();
	let showModal = $state(false);

	import './page.css';

	import Widget from '$lib/Widgets/template.svelte';
	import type { WidgetData } from '$lib/Widgets/template.svelte';
	const widgets = $derived((data.data?.widgets ?? []) as WidgetData[]);
</script>

<div class="main">
	<!-- Top Header -->
	<header class="main-header">
		<span class="name">Welcome Back {data.user.name}</span>
		<button
			class="button settings-button"
			id="OpenSettingsModal"
			onclick={() => (showModal = true)}
		>
			Settings
		</button>
	</header>

	<!-- all widgets go here -->
	<div class="grid">
		{#each widgets as widget (widget.id)}
			<Widget {widget} />
		{/each}
	</div>
</div>

<Modal bind:showModal>
	{#snippet header()}
		<h2>Settings</h2>
	{/snippet}
	<form method="post" action="?/addPressed" use:enhance>
		<button class="button" name="item" value="New Item">Add New Item</button>
	</form>

	<form method="post" action="?/signOut">
		<button class="button">Sign out</button>
	</form>
</Modal>
