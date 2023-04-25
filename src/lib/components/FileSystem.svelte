<script lang="ts">
  import type { checkScrubRequest, checkScrubResponse, fileSystem, startScrubRequest, startScrubResponse, subvolume } from "$lib/interfaces/btrfs"
  import { faBroom, faCircleInfo, faEllipsis, faPlus, type IconDefinition } from "@fortawesome/free-solid-svg-icons"
  import Fa from "svelte-fa/src/fa.svelte"
  import SubVolume from "./SubVolume.svelte"
  import { createSubvolumeWithLocation } from "$lib/tools/createNewSubvolume"
  import Input from "./Input.svelte"
  import { fade, slide } from "svelte/transition"
  import { cubicOut } from "svelte/easing"
  import ScrubProgress from "./tools/ScrubProgress.svelte"

  export let fileSystem: fileSystem

  /** Fields for creating a new subvolume */
  let creatingSubvolume: boolean = false
  let value: string = "" // value of the new subvolume
  let error: string | undefined
  
  /** Info */
  let showInfo: boolean = false
  
  /** Context menu */
  let showContextMenu: boolean = false
  let options: {name: string, icon: IconDefinition, action?: () => any}[] = [
    { name: `Toggle Details`, icon: faCircleInfo, action: toggleDetails},
    { name: "Run Scrub", icon: faBroom, action: startScrub },
  ]

  /** Scrubs */
  let scrubProgress: number | undefined


  /** Request the creation of a New Subvolume */
  async function addSubvolume() {
    error = await createSubvolumeWithLocation(`${fileSystem.mountpoint}/${value}`)
  }

  function toggleDetails() {
    showInfo = !showInfo
    showContextMenu = false
  }

  async function startScrub() {
    showContextMenu = false

    let request = JSON.stringify({
      location: fileSystem.mountpoint
    } satisfies startScrubRequest)

    let res = await fetch("API/startScrub", {
      method: "POST",
      body: request 
    })

    let {success, message} = await res.json() as startScrubResponse

    if (!success) {
      alert(message)
      return
    }

    scrubProgress = 0
    updateScrubProgress()
  }

  async function updateScrubProgress() {
    let req: checkScrubRequest = {
      location: fileSystem.mountpoint
    }

    let res = await fetch('API/checkScrub', {
      method: "POST",
      body: JSON.stringify(req)
    })

    let {complete, progress, success, error} = await res.json() as checkScrubResponse

    if (!success) {
      alert(error)
      return
    }

    if (complete) {
      scrubProgress = undefined
      return
    } else {
      scrubProgress = progress
    }

    await setTimeout(() => updateScrubProgress(), 5000)
  }

</script>


<div class="rounded-xl bg-zinc-800 border-[1px] border-zinc-700 p-3 grid gap-3">
  <!-- TITLE, INFO & CONTEXT MENU -->
  <div class="relative text-xl leading-6 border-b-zinc-700 border-b-[1px] -mx-3 px-3 pb-3">
    <!-- Title -->
    <div class="h-6 flex w-full">
      <span class="font-bold">{fileSystem.label}</span>
      <div class="my-auto ml-4 mr-auto">
        {#if scrubProgress !== undefined}
          <ScrubProgress bind:scrubProgress/>
        {/if}
      </div>
      <button 
        class="float-right text-neutral-400 hover:text-white h-6 w-8 text-xl transition-all 
              ease-out"
        on:click={() => showContextMenu = !showContextMenu}
      >
        <Fa class="m-auto" icon={faEllipsis}/>
      </button>
    </div>

    <!-- Info -->
    {#if showInfo}
      <div class="flex flex-wrap text-base text-zinc-400 mt-1" transition:slide>
        <span class="flex font-thin w-fit mr-5">
          <p class="font-normal pr-2">Mountpoint:</p> {fileSystem.mountpoint}
        </span>
        <span class="flex font-thin w-fit mr-5">
          <p class="font-normal pr-2">Mount Device:</p> {fileSystem.device}
        </span>
        <span class="flex font-thin w-fit mr-5">
          <p class="font-normal pr-2">Usage:</p> XXX/XXX
        </span>
        <span class="flex font-thin w-fit mr-5">
          <p class="font-normal pr-2">Last Scrub:</p> 12/34/56
        </span>
      </div>
    {/if}

    
    <!-- Context Menu -->
    {#if showContextMenu}
      <div 
      class="absolute right-3 top-6 w-40 bg-transparent backdrop-blur-sm border-[1px] border-white 
             border-opacity-25 rounded-md p-1 text-base z-20 backdrop-brightness-150 grid gap-1"
      transition:fade={{duration: 200, easing: cubicOut}}
      >
        {#each options as option}
          <button 
            class="text-left hover:bg-sky-600 hover:bg-opacity-50 px-2 rounded"
            on:click={option.action}
          >
            <Fa class="inline mr-2" icon={option.icon}/> {option.name}
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- CONTENT -->
  <div class="pr-3">
    {#if fileSystem.subvolumes.length > 0}
      {#each fileSystem.subvolumes as sv}
        <SubVolume bind:sv/>
      {/each}
    {/if}

    {#if creatingSubvolume}
      <div class="flex h-8">
        <Input 
          label="Subvolume Name" 
          bind:value 
          submit={addSubvolume} 
          cancel={() => creatingSubvolume = false}
          mainClass="bg-zinc-800 border-zinc-700 border-r-none rounded-r-none"
          labelClass=bg-zinc-800
          mt={false}
        />
        <button 
          class="bg-zinc-800 hover:bg-zinc-700 border-[1px] border-zinc-700 rounded-md
                 w-20 h-8 rounded-l-none border-l-0"
          on:click={addSubvolume}
        >
          Create
        </button>
      </div>
    {:else}
      <button 
        class="h-8 m-auto px-2 text-neutral-400 hover:text-white transition-all ease-out" 
        on:click={() => creatingSubvolume = true}
      >
        <Fa class="inline" icon={faPlus}/>
        <span class="inline">Add a subvolume</span>
      </button>
    {/if}
  </div>

  
</div>

{#if showContextMenu}
  <button 
    class="fixed inset-0 z-10 cursor-default" 
    on:mousedown|stopPropagation={() => showContextMenu = false}
  />
{/if}
