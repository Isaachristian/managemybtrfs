<script lang="ts">
	import { page } from '$app/stores'
	import Notifications from '$lib/components/Notifications.svelte'
	import {
	  faBell, faCog
	} from '@fortawesome/free-solid-svg-icons'
	import NavItem from '../../lib/components/NavItem.svelte'

	let pageTitle: string = ''
	page.subscribe(value => {
		let currentPage = value?.route?.id?.split('/').filter(s => s !== '')

		console.log(currentPage)

		if (currentPage)
			pageTitle =
				currentPage.length === 0 ? 'Home' : currentPage[currentPage.length - 1]
	})

	function getTitle(pathname: string): string {
		const splitPath: string[] = pathname?.split('/').filter(s => s === '/')

		return splitPath.length === 0 ? 'Home' : splitPath[splitPath.length - 1]
	}
</script>

		<!-- Left Nav -->
		<div
			class="absolute left-0 top-0 right-0 h-10 bg-gray-800 p-1 pl-2"
		>
			<nav class="relative w-full h-full flex">
				<!-- <NavItem href={'/App/Manager'} icon={faFolderTree}/> -->
				<NavItem href={'/App/Manager'} title={"ManageMyBTRFS"}/>
				<div class="absolute right-0 flex space-x-2">
					<Notifications icon={faBell}/>
					<NavItem href={'/App/Settings'} icon={faCog}/>
				</div>
			</nav>
		</div>
		<!-- End Left Nav -->

		<!-- Page Content -->
		<div class="absolute left-4 right-4 top-12 bottom-0">
			<div class="h-10 w-full text-3xl font-bold">
				{pageTitle}
			</div>
			<slot />
		</div>
		<!-- End Page Content -->
