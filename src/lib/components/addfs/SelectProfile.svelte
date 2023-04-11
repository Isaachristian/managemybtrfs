<script lang="ts">
  import { btrfsProfiles, type profile } from "$lib/interfaces/btrfs"

  export let selectedProfile: profile | null = null
</script>

<div class="grid grid-cols-1 gap-3 col-span-2 rounded-lg bg-neutral-700 p-3">
  <span class="cols-span-1 text-lg font-bold leading-4">Select Allocation Profiles</span>
  <div class="cols-span-1 h-8 relative w-full">
    {#if !selectedProfile}
      <div 
        class="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-neutral-300 pointer-events-none"
      >
        Select a profle...
      </div>
    {/if}
    <select 
      class="appearance-none bg-neutral-600 px-2 !outline-none focus:outline-none border-[1px]
             border-neutral-500 absolute inset-0 cursor-pointer rounded"
      placeholder="Select an Allocation Profile"
      bind:value={selectedProfile}
    >
      {#each btrfsProfiles as profile}
        <option value={profile}>{profile.name}</option>
      {/each}
    </select>
  </div>
</div>

