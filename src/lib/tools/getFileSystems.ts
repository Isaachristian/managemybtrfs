import {execSync, exec} from 'child_process'
import type { fileSystem, subvolume } from '$lib/interfaces/btrfs'


/**
 * 
 * @returns 
 */
export function getFilesystems(): Promise<fileSystem[] | string> {
  return new Promise(async (resolve, reject) => {
    let fileSystems: fileSystem[] = []

		try {
			exec('sudo btrfs filesystem show', (error, stdout) => {
				if (error) {
					reject(error);
				} 
	
				let tokens = stdout.toString().split("\n\n").filter(s => s.trim() != "")

				fileSystems = tokens.map(t => processFSString(t)).filter(fs => fs.mountpoint !== "")
	
				resolve(fileSystems) 
			})
		} catch (e) {
			reject(e)
		}
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
	let devices: string[] = []
	let mountpoint: string = ""
	
	let tokens = fsString.trim().split(/[ \n\t]/)
	for (let i = 0; i < tokens.length; i++) {
		switch (tokens[i]) {
			case "Label:":
				if (tokens[i+1].startsWith("'")) {
					label = tokens[i+1].slice(1, tokens[i+1].length-1)
				} else {
					label = tokens[i+1]
				}
				break
			case "uuid":
				uuid = tokens[i+1]
				break
			case "path": 
				devices.push(tokens[i+1])
				break
		}
	}

	let i = -1
	while (mountpoint === "" && i < devices.length) {
		mountpoint = getMountPoint(devices[++i])
	}

	return {
		label: label,
		device: devices[i],
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
	try {
		let buf = execSync(`sudo mount | grep ${device}`).toString()
	
		let index1 = buf.search(" on ")
		let index2 = buf.search(" type ")
	
		return buf.slice(index1+4, index2)
	} catch (e) {
		return ""
	}
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

