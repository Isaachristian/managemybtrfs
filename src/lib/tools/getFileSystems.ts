import {execSync, exec} from 'child_process'
import type { fileSystem, subvolume } from '$lib/interfaces/btrfs'


/**
 * 
 * @returns 
 */
export function getFilesystems(): Promise<fileSystem[]> {
  return new Promise(async (resolve, reject) => {
    let fileSystems: fileSystem[] = []

		exec('sudo btrfs filesystem show', (error, stdout) => {
			if (error) {
				reject(error);
			} 

			let tokens = stdout.toString().split("\n\n").filter(s => s.trim() != "")

			fileSystems = tokens.map(fsString => processFSString(fsString))

			resolve(fileSystems) 
		})
  })
}

/**
 * 
 * @param fsString 
 * @returns 
 */
function processFSString(fsString: string): fileSystem {
	let label: string = ""
	let uuid: string = ""
	let device: string = ""
	let mountpoint: string = ""
	
	let tokens = fsString.trim().split(/[ \n\t]/)
	// console.log(tokens)
	for (let i = 0; i < tokens.length; i++) {
		switch (tokens[i]) {
			case "Label:":
				if (tokens[i+1].startsWith("'")) {
					label = tokens[i+1].slice(1, tokens[i+1].length-1)
				} else {
					label = tokens[i+1]
				}
			case "uuid":
				uuid = tokens[i+1]
			case "path": 
				device = tokens[i+1]
		}
	}

	mountpoint = getMountPoint(device)

	return {
		label: label,
		device: device,
		mountpoint: mountpoint,
		uuid: uuid,
		subvolumes: getSubvolumes(mountpoint) // TODO
	}
}


/**
 * 
 * @param device 
 * @returns 
 */
function getMountPoint(device: string): string {
	let buf = execSync(`mount | grep ${device}`).toString()

	let index1 = buf.search(" on ")
	let index2 = buf.search(" type ")

	return buf.slice(index1+4, index2)
}


/**
 * 
 */
function getSubvolumes(mountpoint: string): subvolume[] {
	let subvolumes: subvolume[] = []

	let buf = execSync(`sudo btrfs subvolume list ${mountpoint}`).toString()

	if (buf.trim()) {
		let subVolStrs: string[] = buf.split('\n')

		// Find the base volumes
		subVolStrs.filter(s => s.trim() != "").forEach(svs => {
			let path = svs.slice(svs.search("path") + 5, svs.length)

			if (!path.includes("/")) {
				subvolumes.push({
					name: path,
					subvolumes: [],
					fsMountPoint: mountpoint
				})
			} else {
				let pathTokens = path.split("/")

				let parent = subvolumes.find(sv => sv.name === pathTokens[0])
				if (parent !== undefined) {
					for (let token of pathTokens.slice(1, pathTokens.length-1)) {
						parent = parent?.subvolumes.find(sv => sv.name == token)
					}
				}

				parent?.subvolumes.push({
					name: pathTokens[pathTokens.length-1],
					subvolumes: [],
					fsMountPoint: mountpoint
				})
			}
		})
	}

	return subvolumes
}

