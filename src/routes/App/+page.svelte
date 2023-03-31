<script lang="ts">
    import {faBell, faCog} from "@fortawesome/free-solid-svg-icons";
    import Notifications from "$lib/components/Notifications.svelte";
    import Settings from "$lib/components/Settings.svelte";

    let fsList: any[] = []

    async function getFileSystems() {
      let res = await fetch('/API/getfs');

      try {
        let item = JSON.parse(await res.json());

        if (item?.filesystems) {
          fsList = [...item.filesystems]
        }

        console.log(item);
      } catch (e) {
        console.error(e);
      }

    }
</script>

<!-- Top Nav -->
<div class="absolute left-0 top-0 right-0 h-10 bg-gray-8001 bg-black p-1 px-2">
  <nav class="relative w-full h-full flex">
    <div class="leading-8 px-2 font-bold text-xl">ManageMyBTRFS</div>
    <div class="absolute right-0 flex space-x-2">
      <Notifications icon={faBell}/>
      <Settings icon={faCog}/>
    </div>
  </nav>
</div>
<!-- End Top Nav -->

<!-- Page Content -->
<div class="absolute left-4 right-4 top-14 bottom-4">
  <button on:click={getFileSystems}>Get Filesystems</button>

  <br>
  <br>

  {#if fsList.length === 0}
    Waiting to Load Filesystems...
  {:else}
    {#each fsList as fs}
      {fs?.target}
    {/each}
  {/if}
</div>
<!-- End Page Content -->