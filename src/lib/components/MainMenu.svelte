<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte'
  import {faBars as icon, faChevronDown, faFolderTree} from "@fortawesome/free-solid-svg-icons";
  import { slide } from 'svelte/transition'
  import { cubicInOut, cubicOut } from 'svelte/easing'
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
      class="absolute top-10 -right-0 rounded-xl transition-all bg-neutral-800 shadow-md
             z-20 border-neutral-600 border-[1px] font-thin"
      transition:slide={{duration: 200, easing: cubicInOut}}
      on:click|stopPropagation
    >
      <div class="relative h-full w-60 p-2">
        <div class="space-y-2">
          <div class="grid grid-cols-2 gap-2">
            <button class="bg-neutral-700 hover:bg-neutral-600 rounded-lg w-full h-8">
              Start Scrub
            </button>

            <!-- Logout -->
            <form class="col-span-1" method="post" action="?/logout">
              <button class="bg-neutral-700 hover:bg-neutral-600 rounded-lg w-full h-8 
                             text-red-400">
                Logout
              </button>
            </form>

            <div 
              class="col-span-2 bg-neutral-700 rounded-lg w-full overflow-hidden"
              class:bg-neutral-800={!showMore}
            >
              <button 
                class="relative h-8 w-full hover:bg-neutral-600 font-normal text-left px-2"
                on:click={() => showMore = !showMore}
              > 
                <Fa class="inline mr-1.5" icon={faFolderTree} scale={.8}/>
                Filesystem Options
                <Fa 
                  class="absolute right-2 top-1/2 -translate-y-1/2" 
                  icon={faChevronDown}
                  rotate={showMore ? "180" : "0"}
                />
              </button>

              {#if showMore}
                <div class="grid" transition:slide={{duration: 200}}>
                  <div class="h-[.5px] bg-neutral-800"></div>
                  <button 
                    class="bg-neutral-700 hover:bg-neutral-600 w-full h-8 text-left px-3" 
                    on:click={runGetFileSystems}
                  >
                    Refresh Filesystems
                  </button>
                  <button 
                    class="bg-neutral-700 hover:bg-neutral-600 w-full h-8 text-left px-3" 
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
