<script lang="ts">

  /** Number between 0 and 100 */
  export let scrubProgress: number | undefined


</script>

<div class="relative h-3 w-60 rounded-full border-zinc-700 border-[1px] overflow-hidden">
  <div class="bg-emerald-600 h-full" style:width={`${scrubProgress ?? 0}%`}/> 
</div>
