<script lang="ts">
  export let label: string
  export let value: string
  export let full: boolean = true
  export let mt: boolean = true
  export let mainClass: string = ""
  export let labelClass: string = ""
  export let submit: () => void
  export let cancel: () => void

  let focused: boolean = false
  $: moveLabel = focused || value != ""

  function reactToKey(e: KeyboardEvent) {
    switch (e.key) {
      case "Enter":
        submit() 
        break;
      case "Escape":
        cancel() 
        break;
    }
  }
</script>

<div class="relative h-8" class:w-full={full} class:inline={!full} class:mt-1={mt}>
  <input
    class={`bg-neutral-700 px-2 focus:outline-none border-[1px] rounded-md border-neutral-500 
           absolute inset-0 cursor-default focus:cursor-text ${mainClass}`}
    on:focusin={() => focused = true}
    on:focusout={() => focused = false}
    on:keypress={reactToKey}
    bind:value
  />
  <div 
    class={`absolute left-1.5 top-1/2 -translate-y-1/2 text-neutral-400 rounded transition-all
            px-1 duration-200 ease-out pointer-events-none leading-3 bg-neutral-700 
            ${labelClass}`}
    class:scale-90={moveLabel}
    class:!-top-0.5={moveLabel}

    class:left-2={moveLabel}
  >
    {label}
  </div>
</div>
