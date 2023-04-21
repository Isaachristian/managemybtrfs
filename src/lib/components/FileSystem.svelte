<script lang="ts">
  import type { fileSystem, subvolume } from "$lib/interfaces/btrfs"
  import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons"
  import Fa from "svelte-fa/src/fa.svelte"
  import SubVolume from "./SubVolume.svelte"
  import { createSubvolumeWithLocation } from "$lib/tools/createNewSubvolume"

  export let fileSystem: fileSystem

  let value: string = "" // value of the new subvolume
  let error: string | undefined

  $: console.log(fileSystem.mountpoint)

  async function addSubvolume() {
    error = await createSubvolumeWithLocation(`${fileSystem.mountpoint}/value`)
  }

</script>


<div class="rounded-xl bg-neutral-800 border-[1px] border-neutral-700 p-3 shadow-lg grid gap-3">
  <div class="text-xl leading-6 h-6">
    <span class="font-bold">{fileSystem.label}</span>
    <span class="font-thin text-neutral-200"> — {fileSystem.mountpoint}</span>
    <button class="float-right text-neutral-200 hover:text-white rounded h-6 w-8 text-xl">
      <Fa class="m-auto" icon={faEllipsis}/>
    </button>
  </div>

  {#if fileSystem.subvolumes.length > 0}
    {#each fileSystem.subvolumes as sv}
      <SubVolume bind:sv/>
    {/each}
  {:else}
    <button class="h-8 m-auto px-2 text-neutral-200 hover:text-white">
      <Fa class="inline" icon={faPlus}/>
      <span class="inline">Add a subvolume</span>
    </button>
  {/if}

  
</div>
