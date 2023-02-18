<script lang="ts">
	import '../app.css'
	import NavItem from '../lib/components/NavItem.svelte'
	import {
		faHouse,
		faCog,
		faGaugeHigh,
		faFolderTree,
		faBell
	} from '@fortawesome/free-solid-svg-icons'
	import {page} from '$app/stores'

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

<div class="absolute inset-0 text-white">
	<div class="relative w-full h-full bg-gray-900">
		<!-- Left Nav -->
		<div
			class="absolute left-2 top-2 bottom-2 w-16 p-2 pb-0 bg-gray-800 rounded-xl"
		>
			<nav class="relative w-full h-full">
				<NavItem href={'/'} icon={faHouse} pageName="Home"/>
				<NavItem href={'/Statistics'} icon={faGaugeHigh} pageName="Statistics"/>
				<NavItem href={'/FileSystem'} icon={faFolderTree} pageName="File System"/>
				<div class="absolute bottom-0">
					<NavItem href={'/Notifications'} icon={faBell} pageName="Notifications"/>
					<NavItem href={'/Settings'} icon={faCog} pageName="Settings"/>
				</div>
			</nav>
		</div>
		<!-- End Left Nav -->

		<!-- Page Content -->
		<div class="absolute left-20 right-0 top-0 bottom-0 p-1">
			<div class="h-10 w-full text-3xl font-bold">
				{pageTitle}
			</div>
			<slot />
		</div>
		<!-- End Page Content -->
	</div>
</div>
