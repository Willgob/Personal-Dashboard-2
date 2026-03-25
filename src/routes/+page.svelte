<script lang="ts">
    import { enhance } from '$app/forms';
</script>

<div class="top-bar"></div>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<form method="post" action="?/login" use:enhance>
    <button >Click me</button>
</form>

