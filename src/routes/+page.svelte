<script lang="ts">
    import "./main.css";
    import { enhance } from '$app/forms';
</script>


<h1>Dashboard Name</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<form method="post" action="?/login" use:enhance>
    <button >Click me</button>
</form>

