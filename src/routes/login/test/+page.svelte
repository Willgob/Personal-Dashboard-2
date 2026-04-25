<script>
let value = $state();
let message = $state('No data fetched yet.');

async function fetchData() {
    const response = await fetch('/api/v1/test');
    value = await response.json();
    message = value.message;
}
</script>
<button onclick={fetchData}>Fetch Data</button>
<p>{message}</p>