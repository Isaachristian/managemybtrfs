<script lang="ts">
  import type { subvolume } from "$lib/interfaces/btrfs"
  import Fa from "svelte-fa/src/fa.svelte"
  import SubVolume from "./SubVolume.svelte"
  import { faChevronRight, faEllipsis } from "@fortawesome/free-solid-svg-icons"
  import { slide } from "svelte/transition"
  import Input from "./Input.svelte"
  import { createSubvolume } from "$lib/tools/createNewSubvolume"

  export let sv: subvolume
  export let parentPath: string = ""

  let showMenu = false

  let showSubvolumes = false

  /** Adding Sub Volume */
  let addingSV = false
  let value: string = ""
  let error: string | undefined = undefined

  /**
   * Builds the parent path
   */
  function getParentPath(): string {
    return `${parentPath}${parentPath.length > 0 ? '/' : ''}${sv.name}`
  }


  async function createNewSubvolume() {
    error = await createSubvolume(sv, value, parentPath)
  }
</script>

<div class="grid mb-4 w-full text-zinc-300 hover:text-white transition-all">
  <!-- TITLE & MENU -->
  <div class="font-bold text-md leading-3 text-left">
    <button class="mr-auto" on:click|stopPropagation={() => showSubvolumes = !showSubvolumes}>
      <Fa 
        icon={faChevronRight} 
        class={`inline pr-1 ${showSubvolumes ? "rotate-90" : "rotate-0"} transition-transform`}
      />
      {sv.name ? sv.name : "Placeholder"}
    </button>
    <button class="float-right h-4 relative" on:click={() => showMenu = !showMenu}>
      <Fa icon={faEllipsis}/>
      {#if showMenu}
        <div class={`absolute top-4 -right-1 w-40  bg-neutral-${700} rounded shadow-lg border-[1px]
                   border-neutral-500 z-10 overflow-hidden`}>
          <button 
            class="h-8 w-full bg-transparent hover:bg-neutral-800 text-white"
            on:click={() => addingSV = true}
          >
            Add Subvolume
          </button>
        </div>
      {/if}
    </button>
  </div>

  <!-- SUBVOLUMES -->
  {#if sv.subvolumes.length > 0 && showSubvolumes} 
    <div class="ml-4 pt-3 -mb-1" transition:slide={{duration: 150}}>
      {#each sv.subvolumes as subvolume}
        <SubVolume bind:sv={subvolume} parentPath={getParentPath()}/>
      {/each}
    </div>
  {/if}

  {#if addingSV}
    <div 
      transition:slide={{duration: 200}} 
      class="relative h-8 transition-all duration-200 ease-out" 
      class:h-12={!!error}
    >
      <div class="absolute inset-0 right-20 -top-1">
        <Input
          label="New Subvolume"
          submit={createNewSubvolume}
          cancel={() => addingSV = false}
          bind:value
        />
      </div>
      <button 
        class="absolute right-0 t-0 h-8 rounded-md bg-slate-800 w-[72px] hover:bg-slate-700"
        on:click={createNewSubvolume}
      >
        Submit
      </button>

      {#if error}
        <div class="absolute text-red-400 h-8 top-8">{error}</div>
      {/if}
    </div>
  {/if}
</div>