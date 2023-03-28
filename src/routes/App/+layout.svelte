<script lang="ts">
	import {page} from '$app/stores'
	import Notifications from '$lib/components/Notifications.svelte'
	import Settings from "$lib//components/Settings.svelte";
	import {faBell, faCog} from '@fortawesome/free-solid-svg-icons'

	let pageTitle = ''
	page.subscribe(value => {
		let currentPage = value?.route?.id?.split('/').filter(s => s !== '')

		console.log(currentPage)

		if (currentPage)
			pageTitle = currentPage.length === 0 ? 'Home' : currentPage[currentPage.length - 1]
	})
</script>

<!-- Top Nav -->
<div class="absolute left-0 top-0 right-0 h-10 bg-gray-8001 bg-black p-1 px-2">
	<nav class="relative w-full h-full flex">
		<div class="leading-8 px-2 font-bold text-xl">ManageMyBTRFS</div>
		<div class="absolute right-0 flex space-x-2">
			<Notifications icon={faBell}/>
			<Settings icon={faCog}/>
		</div>
	</nav>
</div>
<!-- End Top Nav -->

<!-- Page Content -->
<div class="absolute left-4 right-4 top-12 bottom-0">
	<div class="h-10 w-full text-3xl font-bold">
		{pageTitle}
	</div>
	<slot />
</div>
<!-- End Page Content -->
