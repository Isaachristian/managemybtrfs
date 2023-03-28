<script lang="ts">
    import {faBell, faCog} from "@fortawesome/free-solid-svg-icons";
    import Notifications from "$lib/components/Notifications.svelte";
    import Settings from "$lib/components/Settings.svelte";

    let fsList: string[] = []

    function getFileSystems() {

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
  <button>Get Filesystems</button>

  <br>

  {#if fsList.length === 0}
    There are no file systems...
  {:else}
    {fsList}
  {/if}
</div>
<!-- End Page Content -->