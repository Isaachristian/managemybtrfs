<script lang="ts">
  import { invalidateAll } from "$app/navigation"
  import FileSystem from "$lib/components/FileSystem.svelte"
  import MainMenu from "$lib/components/MainMenu.svelte"
  import AddFileSystem from "$lib/components/modals/AddFileSystem.svelte"
  import type { PageData } from "./$types"

  export let data: PageData

  

  let showAddFilesystem: boolean = false
</script>

<!-- Top Nav -->
<div class="absolute left-0 top-0 right-0 h-10 bg-gray-8001 bg-black p-1 px-2">
  <nav class="relative w-full h-full flex">
    <div class="leading-8 px-2 font-bold text-xl">ManageMyBTRFS</div>
    <div class="absolute right-0 flex space-x-2">
      <button on:click={() => invalidateAll()}>test</button>
      <MainMenu bind:showAddFilesystem/>
    </div>
  </nav>
</div>
<!-- End Top Nav -->

<!-- Page Content -->
<div class="absolute left-4 right-4 top-10 bottom-0 overflow-y-scroll py-4">
  {#await data.async.fileSystems}
    Loading Filesystems...
  {:then fileSystems} 
    <div class="grid grid-cols-1 gap-4">
      {#each fileSystems as fileSystem}
        <FileSystem {fileSystem}/>
      {/each}
    </div>
  {/await}
</div>
<!-- End Page Content -->

<AddFileSystem bind:showAddFilesystem/>
