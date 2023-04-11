<script lang="ts">
  import { slide } from "svelte/transition"
  import Input from "../Input.svelte"

  export let driveCntValid: boolean

  export let filesystemName: string = ""
  export let mntDirectory: string = ""

</script>

{#if driveCntValid}
  <div
    class="grid grid-cols-1 gap-3 col-span-2 rounded-lg bg-neutral-700 p-3"
    transition:slide={{duration: 200}}
  >
    <div class="cols-span-1 text-lg font-bold leading-4">
      Additional Options
    </div>
    <div class="space-y-4">
      <Input label="Filesystem Name" bind:value={filesystemName}/>
      <Input label="Mount Point" bind:value={mntDirectory}/>
    </div>
  </div>
{/if}