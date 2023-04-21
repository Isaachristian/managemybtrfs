<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte'
  import {faBars as icon, faChevronDown} from "@fortawesome/free-solid-svg-icons";
  import { slide } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import { invalidateAll } from '$app/navigation'

  /** For toggling the modal */
  export let showAddFilesystem = false

	let scale = 1.3
  let show = false
  let showMore = false
  

	function showNotifications() {
		show = !show
    showMore = false;
	}

  function toggleAddFilesystem() {
    showAddFilesystem = true
    showNotifications()
  }

  function runGetFileSystems() {
    invalidateAll()
    showNotifications()
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="bg-black hover:bg-neutral-900 mb-1 h-8 w-8 rounded-md relative
          transition-all duration-200"
  class:bg-neutral-900={show}
>
  <Fa class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" {icon} {scale}/>

  {#if show}
    <div
      class="absolute top-10 -right-0 rounded-xl bg-neutral-800 transition-all
             z-10 border-neutral-600 border-[1px] shadow-lg "
      transition:slide={{duration: 200, easing: cubicOut}}
      on:click|stopPropagation
    >
      <div class="relative h-full w-60 p-2">
        <div class="space-y-2">
          <div class="grid grid-cols-2 gap-2">
            <button class="bg-neutral-600 rounded-lg w-full h-8">Start Scrub</button>

            <!-- Logout -->
            <form class="col-span-1" method="post" action="?/logout">
              <button class="bg-neutral-600 rounded-lg w-full h-8 text-red-400 font-bold">Logout</button>
            </form>

            <div class="col-span-2 bg-neutral-600 rounded-lg w-full">
              <button class="h-8 w-full" on:click={() => showMore = !showMore}> 
                <Fa class="inline" icon={faChevronDown} rotate={showMore ? "180" : "0"}/> &nbsp;Filesystem Options
              </button>

              {#if showMore}
                <div class="grid gap-2 p-2" transition:slide={{duration: 200}}>
                  <button 
                    class="bg-neutral-500 rounded-md w-full h-8" 
                    on:click={runGetFileSystems}
                  >
                    Refresh Filesystems
                  </button>
                  <button 
                    class="bg-neutral-500 rounded-md w-full h-8" 
                    on:click={toggleAddFilesystem}
                  >
                    Add File System
                  </button>
                </div>
              {/if}
            </div>
            
          </div>

          
          <!-- Notificaitons -->
          <!-- <div class="rounded bg-gray-600 p-2">
            This is a notification that could pop up
          </div>
          <div class="rounded bg-gray-600 p-2">
            This is a notification that could pop up
          </div>
          <div class="rounded bg-gray-600 p-2">
            This is a notification that could pop up
          </div> -->
        </div>
      </div>
    </div>
  {/if}

	<button
		class="absolute inset-0 text-transparent" 
		on:click|stopPropagation={showNotifications}
	>+</button>
</div>



<svelte:window on:click={() => show = showMore = false}/>
