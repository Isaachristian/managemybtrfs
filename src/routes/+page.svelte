<script lang="ts">
  import { goto } from "$app/navigation"

	async function login() {
		goto("/App/Manager")
	}
</script>

<div class="text-xl absolute top-2 left-4 font-bold">ManageMyBTRFS</div>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4
            w-[320px] rounded-xl bg-gray-800"
>	
	<div class="space-y-4">
		<div class="text-4xl font-bold m-auto w-full text-center">Login</div>
		
		<input 
			class="rounded-md bg-gray-700 border-[1px] border-gray-600 p-2 w-full
			       h-8 outline-none" 
			type="text"
			name="username"
			placeholder="Username"
		/>

		<input 
			class="rounded-md bg-gray-700 border-[1px] border-gray-600 p-2 w-full
			       h-8 outline-none"
			type="text"
			name="username"
			placeholder="Password"
		/>
		
		<button 
			on:click={() => login()} 
			class="bg-gray-600  h-8 w-full rounded-md hover:bg-gray-500"
		>
			Login
		</button>
	</div>
</div>


