<script>
    import { page } from '$app/state';
</script>

{#if page.status === 404}
    <h1>{page.status} {page.error?.message}</h1>
    <div>Don't Cry :(  its just a 404 error :7:</div>
    <br>
    <enhanced:img src="$lib/assets/404.png" alt="404 Image" />
{/if}
