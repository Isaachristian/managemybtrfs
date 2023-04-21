<script lang="ts">
  import type { blockDevice, createFS, profile } from "$lib/interfaces/btrfs"
  import { faXmark } from "@fortawesome/free-solid-svg-icons"
  import Fa from "svelte-fa/src/fa.svelte"
  import { scale, slide } from "svelte/transition"
  import SelectProfile from "../addfs/SelectProfile.svelte"
  import SelectDrives from "../addfs/SelectDrives.svelte"
  import SelectMountPoint from "../addfs/SelectMountPoint.svelte"

  /** Show/Hide the Modal */
  export let showAddFilesystem = false

  let selectedProfile: profile | null
  let selectedDrives: blockDevice[]
  let driveCntValid: boolean
  let filesystemName: string
  let mntDirectory: string

  let error: string | undefined = undefined

  let submitDisabled: boolean = true
  $: checkDisabled(selectedProfile, selectedDrives, driveCntValid, filesystemName, mntDirectory)

  function checkDisabled(sp: profile | null, sd: blockDevice[], dcv: boolean, fsn: string, 
                         mp: string) {
    submitDisabled = !(sp && sd && dcv && fsn && mp)
  }

  async function submit() {
    if (selectedProfile && selectedDrives) {
      let data: createFS = {
        profile: selectedProfile,
        devices: selectedDrives,
        path: `${mntDirectory}/${filesystemName}`,
        label: filesystemName
      }
  
      if (!submitDisabled) {
        let res = await fetch("API/createFS", {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          }
        })

        let body = await res.json()

        if (body.success == true) {
          close()
        } else {
          error = body.message
        }
      }

    }
  }
  
  function close() {
    showAddFilesystem = false
    selectedProfile = null
    selectedDrives = []
  }

</script>

{#if showAddFilesystem}
  <div 
    class="fixed left-0 inset-0 bg-black border-neutral-500 z-40 !m-0 bg-opacity-50 pt-14 pb-4"
    transition:scale={{duration: 200, start: .98}}
  >
    <div class="relative p-3 bg-neutral-800 w-[600px] rounded-xl border-neutral-600 border-[1px]
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-full overflow-y-scroll"
    >
      <!-- Close Button -->
      <button 
        class="absolute top-3 right-3 hover:bg-neutral-700 h-6 w-6 rounded"
        on:click={close}
      >
        <div class="relative">
          <Fa 
            class="absolute text-red-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            icon={faXmark}
            scale={1.2}
          />
        </div>
      </button>

      <!-- Add Filesystem Form -->
      <div class="grid grid-cols-2 gap-3">
        <div class="col-span-2 font-bold text-2xl mb-2 leading-6">Add New BTRFS Filesystem</div>

        <SelectProfile 
          bind:selectedProfile
        />

        <SelectDrives 
          bind:selectedProfile 
          bind:selectedDrives
          bind:driveCntValid
        />

        <SelectMountPoint
          bind:driveCntValid
          bind:filesystemName
          bind:mntDirectory
        />
        
        <button 
          class="bg-cyan-600 hover:bg-cyan-500 rounded-lg w-full h-8 transition"
          class:cursor-default={submitDisabled}
          class:bg-cyan-700={submitDisabled}
          class:hover:bg-cyan-700={submitDisabled}
          class:text-neutral-400={submitDisabled}
          on:click={submit}
          formaction="?/createFileSystem"
        >
          Create Filesystem
        </button>

        <button 
          class="bg-neutral-700 hover:bg-neutral-600 rounded-lg w-full h-8 transition"
          on:click={close}
        >
          Cancel
        </button>

        {#if error}
          <div class=" text-red-400" transition:slide={{duration: 200}}>
            {error}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}


