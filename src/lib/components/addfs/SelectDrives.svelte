<script lang="ts">
  import type { blockDevice, profile, selectedDrive as driveSlot } from "$lib/interfaces/btrfs"
  import { onMount } from "svelte"
  import { slide } from "svelte/transition"

  export let selectedProfile: profile | null
  export let selectedDrives: blockDevice[] = []
  export let driveCntValid: boolean = false
    
  $: driveCntValid = checkDriveCountValid(selectedProfile, selectedDrives)
  $: minDriveCnt = selectedProfile?.minDrive ?? 1

  $: console.log(minDriveCnt)

  let avaliableDrives: blockDevice[] = []

  onMount(async () => getBlockDevices())

  async function getBlockDevices() {
    let res = await fetch("API/getBlockDevices", { method: "get" })
    let data = await res.json()

    if (data) {
      avaliableDrives = [...data]
    }
  }

  function toggleDevice(device: blockDevice) {
    if (selectedDrives.findIndex(sd => sd.name === device.name) > -1) {
      selectedDrives = [...selectedDrives.filter(sd => sd.name !== device.name)]
    } else {
      selectedDrives = [...selectedDrives, device]
    }
  }

  function checkDriveCountValid(sp: profile | null, sd: blockDevice[]): boolean {
    console.log("made it here")

    if (sp) {
      const minMet: boolean = sd.length >= (sp?.minDrive ?? 1)
      const maxMet: boolean = sp?.maxDrive ? sd.length <= sp?.maxDrive : true

      return minMet && maxMet
    }

    return false
  }

</script>

{#if selectedProfile}
  <div
    class="grid grid-cols-1 gap-3 col-span-2 rounded-lg bg-neutral-700 p-3"
    transition:slide={{duration: 200}}
  >
    <div class="cols-span-1 text-lg font-bold leading-4">
      Drives & Partitions 
      <span class="font-thin">{` (select at least ${selectedProfile?.minDrive ?? 1})`}</span>
    </div>

    <div class="grid grid-cols-3 gap-3">
      {#each avaliableDrives as d}
        <button 
          class="cols-span-1 h-8 bg-neutral-600 rounded-md py-1.5 px-3 leading-5 
                 transition-all duration-200"
          class:bg-sky-700={selectedDrives.findIndex(sd => sd.name === d.name) > -1}
          on:click={() => toggleDevice(d)}
        >{d.name} | {d.size}</button>
      {/each}
    </div>
  </div>
{/if}