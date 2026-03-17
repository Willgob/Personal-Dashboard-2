<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
  	const { data } = $props<PageServerData>();
</script>

<h1>Hi, {data.user.name}!</h1>
<p>Your user ID is {data.user.id}.</p>
<p>THE DATA UH HI</p>
<p>{JSON.stringify(data.data.Test, null, 2)}</p>
<form method="post" action="?/signOut" use:enhance>
	<button>Sign out</button>
</form>
