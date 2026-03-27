<script lang="ts">
    import { enhance } from '$app/forms';
</script>


<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<form method="post" action="?/login" use:enhance>
    <button class="button" >Click me</button>
</form>

 