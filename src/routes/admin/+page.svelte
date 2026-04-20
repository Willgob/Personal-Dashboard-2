<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
	import Modal from '$lib/Modal.svelte';
	const { data }: { data: PageServerData } = $props();
	let showModal = $state(false);
	import './page.css';
</script>

<h1>
	Hi, {data.user.name}!<button
		class="button"
		id="OpenSettingsModal"
		onclick={() => (showModal = true)}>Settings</button
	>
</h1>
<p>Your user ID is {data.user.id}.</p>
<p>THE DATA UH HI</p>
<p>{JSON.stringify(data.data, null, 2)}</p>
<p>ENCRYPTED TOKEN: {data.encryptedToken}</p>
<p> decrypted token: {data.decryptedToken}</p>

<form method="post" action="?/encryptKey" use:enhance>
	<button class="button" name="item" value="New Item">Encrypt Test Key</button>
</form>

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
