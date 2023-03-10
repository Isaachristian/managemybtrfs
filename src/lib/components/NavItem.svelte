<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte'
	import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
  import { goto } from '$app/navigation'

	/** Import the refs/icons for the pages */
	export let href: string
	export let icon: IconDefinition | undefined = undefined
	export let title: string | undefined = undefined
	export let scale = 1.3

	// export let icon: any | undefined

	function navigate() {
		goto(href)
	}
</script>

<div
	class="bg-gray-800 hover:bg-gray-600 mb-1 h-8 w-fit rounded-md relative 
          transition-all duration-200 hover:shadow-lg tooltipParent"
>
	{#if icon}
		<div class="w-8">
			<Fa
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8"
				{icon}
				{scale}
			/>
		</div>
	{/if}

	{#if title}
		<span class="leading-8 px-2 font-bold text-xl">
			{title}
		</span>
	{/if}

	<!-- LINK -->
	<button 
		class="absolute inset-0 text-transparent" 
		on:click={navigate}
	>
		+
	</button>
</div>
