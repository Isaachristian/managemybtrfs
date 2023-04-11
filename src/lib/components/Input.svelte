<script lang="ts">
  export let label: string
  export let value: string

  let focused: boolean = false
  $: moveLabel = focused || value != ""

</script>

<div class="relative w-full h-8 mt-1">
  <input
    class="bg-neutral-700 px-2 focus:outline-none border-[1px] rounded-md border-neutral-500 
           absolute inset-0 cursor-default focus:cursor-text"
    on:focusin={() => focused = true}
    on:focusout={() => focused = false}
    bind:value
  />
  <div 
    class="absolute left-1.5 top-1/2 -translate-y-1/2 text-neutral-400 rounded px-1 
           transition-all duration-200 ease-out pointer-events-none leading-3"
    class:scale-90={moveLabel}
    class:!-top-0.5={moveLabel}
    class:bg-neutral-700={moveLabel}
    class:left-2={moveLabel}
  >
    {label}
  </div>
</div>
