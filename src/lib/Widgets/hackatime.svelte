<script>
  import { onMount } from 'svelte';

  const { widget } = $props();
  const username = widget.username; //to be replaced
  
  const api = widget.api;
  
  let trust = $state(null);
  let today = $state(null);
  let loading = $state(true);

  onMount(async () => {
    const response_trust = await fetch('/api/v1/hackatime/trust?user=' + username);
    const data_trust = await response_trust.json();
    trust = data_trust.data.trust_level;

    const response_today = await fetch('/api/v1/hackatime/today?user=' + username + '&api=' + api);
    const data_today = await response_today.json();
    today = data_today.data.data.grand_total.text;

    loading = false;
  });
</script>

<span>
  <h1>HackaTime</h1>
    {#if loading}
        <p>Loading...</p>
    {:else}
        <p>Trust: {JSON.stringify(trust)}</p>
        <p>{JSON.stringify(today)}</p>
    {/if}
    <!-- <span>{widget.api}</span> -->
</span>