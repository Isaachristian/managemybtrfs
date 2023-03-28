export function hi() {
  console.log("hello world")
}


// import type {RequestHandler} from './$types'
// import {execSync} from 'child_process'
// import {json} from '@sveltejs/kit'
//
// export const GET = (({url}) => {
// 	// /dev/sdb /mnt/data btrfs rw,relatime,degraded,space_cache=v2,subvolid=5,subvol=/ 0 0
//
// 	console.log(execSync('cat /proc/mounts | grep "ext4"').toString())
//
// 	const result = execSync('cat /proc/mounts | grep ext4').toString()
// 	const resultArr = result.trim().split(' ')
//
// 	const mountPoint = resultArr[1]
//
// 	console.log(`Info from ${mountPoint}\n`)
//
// 	const ignore = [
// 		'',
// 		'Free',
// 		'estimated',
// 		':',
// 		'Data',
// 		'ratio:',
// 		'Used:',
// 		'Device',
// 		'size:'
// 	]
// 	// const volumeInfo = execSync(`btrfs subvolume show ${mountPoint}`).toString()
// 	// const freeSpace = execSync(
// 	// 	`sudo btrfs filesystem usage -b ${mountPoint} | grep "Free (estimated)"`
// 	// )
// 	// 	.toString()
// 	// 	.split(/[ \n\t\(\)]/)
// 	// 	.map(s => s.trim())
// 	// 	.filter(s => !ignore.includes(s))
// 	// 	.at(0)
// 	// const ratio = execSync(`sudo btrfs filesystem usage -b ${mountPoint} | grep "Data ratio"`)
// 	// 	.toString()
// 	// 	.split(/[ \n\t\(\)]/)
// 	// 	.map(s => s.trim())
// 	// 	.filter(s => !ignore.includes(s))
// 	// 	.at(0)
//
// 	const usage = execSync(
// 		// `sudo btrfs filesystem usage -b ${mountPoint} | grep "Used:"`
// 		`btrfs filesystem usage -b ${mountPoint} | grep "Used:"`
// 	)
// 		.toString()
// 		.split(/[ \n\t()]/)
// 		.map(s => s.trim())
// 		.filter(s => !ignore.includes(s))
// 		.at(0)
//
// 	// const sizeC = `sudo btrfs filesystem usage -b ${mountPoint} | grep "Device size:"`
// 	const sizeC = `btrfs filesystem usage -b ${mountPoint} | grep "Device size:"`
// 	const size = execSync(sizeC)
// 		.toString()
// 		.split(/[ \n\t()]/)
// 		.map(s => s.trim())
// 		.filter(s => !ignore.includes(s))
// 		.at(0)
//
// 	//console.log(volumeInfo)
// 	//   console.log('Freespace: ' + freeSpace)
// 	//   console.log('Usage:     ' + usage)
// 	//   console.log(`Size:      ${size}`)
// 	//   console.log('Ratio:     ' + ratio + '\n')
//
// 	// console.log(
// 	// 	`Percent:   ${((Number(usage) / Number(size)) * 100).toFixed(2)}%`
// 	// )
//
// 	// const buf: string = execSync('pwd').toString()
//
// 	console.log(`Percent: ${((Number(usage) / Number(size)) * 100).toFixed(2)}%`)
//
// 	return json(`Percent: ${((Number(usage) / Number(size)) * 100).toFixed(2)}%`)
// }) satisfies RequestHandler
