<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import type {IconDefinition} from '@fortawesome/fontawesome-common-types'


  /** Import the refs/icons for the pages */
  export let href: string 
  export let icon: IconDefinition
  export let scale: number = 1.3
  
  // export let icon: any | undefined


</script>

<div class="bg-gray-800 hover:bg-gray-600 mb-1 h-12 w-12 rounded-lg relative 
             transition-all duration-200 hover:shadow-lg">
  <Fa class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" {icon} {scale}/>
  <a class="absolute inset-0" {href}> </a>
</div>
