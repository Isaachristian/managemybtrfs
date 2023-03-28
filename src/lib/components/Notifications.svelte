<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte'
	import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
  import { fly } from 'svelte/transition'

	/** Import the refs/icons for the pages */
	export let icon: IconDefinition
	export let scale = 1.3

  let show = false

	function showNotifications() {
		show = !show
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="bg-black hover:bg-slate-800 mb-1 h-8 w-8 rounded-md relative
          transition-all duration-200 hover:shadow-lg tooltipParent"
  class:bg-gray-600={show}
>
  <Fa class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" {icon} {scale}/>

  {#if show}
    <div
      class="absolute top-10 -right-0 rounded-lg bg-gray-700 shadow-lg
             transition-all z-10"
      transition:fly={{x: 0, y: 5, duration: 200}}
      on:click|stopPropagation
    >
      <div class="relative h-full w-60 p-2">
        <!-- Notificaitons -->
        <div class="text-xl font-bold mb-2">
          Notifications
        </div>

        <div class="space-y-2">
          <div class="rounded bg-gray-600 p-2">
            This is a notification that could pop up
          </div>
          <div class="rounded bg-gray-600 p-2">
            This is a notification that could pop up
          </div>
          <div class="rounded bg-gray-600 p-2">
            This is a notification that could pop up
          </div>
        </div>
      </div>
    </div>
  {/if}

	<button
		class="absolute inset-0 text-transparent" 
		on:click|stopPropagation={showNotifications}
	>+</button>
</div>

<svelte:window on:click={() => show = false}/>
