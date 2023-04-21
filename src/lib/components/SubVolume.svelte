<script lang="ts">
  import type { subvolume } from "$lib/interfaces/btrfs"
  import Fa from "svelte-fa/src/fa.svelte"
  import SubVolume from "./SubVolume.svelte"
  import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
  import { slide } from "svelte/transition"
  import Input from "./Input.svelte"
  import { invalidateAll } from "$app/navigation"
  import { createSubvolume } from "$lib/tools/createNewSubvolume"


  export let sv: subvolume
  export let parentPath: string = ""
  export let bg: number = 700

  let showMenu = false
  let addingSV = false

  let value: string = ""
  let error: string | undefined = undefined

  function getBg(): number {
    return bg > 0 ? bg : 900
  }

  function getBd(): number {
    return Math.max(50, getBg() - 100)
  }

  function getParentPath(): string {
    return `${parentPath}${parentPath.length > 0 ? '/' : ''}${sv.name}`
  }

  async function createNewSubvolume() {
    error = await createSubvolume(sv, value, parentPath)
  }
</script>

<div 
  class={`bg-neutral-${getBg()} p-3 rounded-md border-[1px] border-neutral-${getBd()} shadow-md grid 
          gap-3`}
>
  <span class="font-bold text-md leading-3" class:mb-3={sv.subvolumes.length > 0}>
    <span>
      {sv.name ? sv.name : "Placeholder"}
    </span>
    <button 
      class="float-right h-4 relative"
      class:text-neutral-200={getBg() >= 500}
      class:hover:text-white={getBg() >= 500}
      class:text-neutral-900={getBg() < 500}
      class:hover:text-neutral-700={getBg() < 500}
      on:click={() => showMenu = !showMenu}
    >
      <Fa 
        icon={faEllipsis}
      />
      {#if showMenu}
        <div 
          class={`absolute top-4 -right-1 w-40  bg-neutral-${700} rounded shadow-lg border-[1px]
                 border-neutral-500 z-10 overflow-hidden`}
        >
          <button 
            class="h-8 w-full bg-transparent hover:bg-neutral-800 text-white"
            on:click={() => addingSV = true}
          >
            Add Subvolume
          </button>
        </div>
      {/if}
    </button>
  </span>

  {#each sv.subvolumes as subvolume}
    <SubVolume 
      bind:sv={subvolume} 
      bg={bg-100} 
      parentPath={getParentPath()}
    />
  {/each}

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