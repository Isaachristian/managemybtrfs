<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte'
	import type {IconDefinition} from '@fortawesome/fontawesome-common-types'

	/** Import the refs/icons for the pages */
	export let href: string
	export let pageName: string
	export let icon: IconDefinition
	export let scale = 1.3

	// export let icon: any | undefined
</script>

<div
	class="bg-gray-800 hover:bg-gray-600 mb-1 h-12 w-12 rounded-lg relative 
             transition-all duration-200 hover:shadow-lg tooltipParent"
>
	<Fa
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		{icon}
		{scale}
	/>

	<!-- TOOLTIP -->
	<div class="absolute top-1/2 -right-3 -translate-y-1/2 bg-black w-fit h-8 rounded-md 
	             translate-x-full z-10 shadow-lg transition-all duration-200 tooltip">
		<div class="relative w-full h-full py-1 px-2">
			<div class="h-3 w-3 bg-black absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rotate-45 rounded-bl-sm outline-[1px] outline-gray-500"/>
			<span class="whitespace-nowrap">
				{pageName}
			</span>
		</div>
	</div>
	<!-- END TOOLTIP -->


	<!-- LINK -->
	<a class="absolute inset-0 text-transparent" {href}>+</a>
</div>

<style>
	.tooltipParent:hover .tooltip {
		transform: translate(100%, -50%) scale(100%);
		opacity: 1
	}

	.tooltip {
		transform: translate(90%, -50%) scale(50%);
		opacity: 0;
		pointer-events: none;
	}
</style>
