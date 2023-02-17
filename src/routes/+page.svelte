<script lang="ts">

  let serverResult: string = "Click the above button..."

  async function runCommandOnBackend() {
    const response = await fetch('/', {
      method: 'GET',
    });

    serverResult = await response.json();
  }

</script>

<h1>Welcome to SvelteKit</h1>

<button
  on:click={() => runCommandOnBackend()}>
  LS the server directory
</button>

<div>
  {serverResult}
</div>
