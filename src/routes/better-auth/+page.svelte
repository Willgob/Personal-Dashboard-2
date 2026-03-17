<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
  	const { data } = $props<PageServerData>();
</script>

<h1>Hi, {data.user.name}!</h1>
<p>Your user ID is {data.user.id}.</p>
<p>THE DATA UH HI</p>
<p>{JSON.stringify(data.data, null, 2)}</p>
<form method="post" action="?/addPressed" use:enhance>
	<button name="item" value="New Item">Add New Item</button>
</form>

<form method="post" action="?/signOut" use:enhance>
	<button>Sign out</button>
</form>
