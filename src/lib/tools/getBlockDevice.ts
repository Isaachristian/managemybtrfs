import type { blockDevice } from "$lib/interfaces/btrfs"
import {execSync} from "child_process"

/**
 * This function gets a list of block devices that have no file systems on them
 * 
 * @returns A list of block devices that have no file systems on them
 */
export function getAvailableBlockDevices(): blockDevice[] {
  let buf = execSync("lsblk --json")
  let blockDevices: blockDevice[] = JSON.parse(buf.toString())?.blockdevices

  if (!blockDevices) throw("No failed to get devices")

  let avaliableBlockDevices: blockDevice[] = []
  for (let bd of blockDevices) {
    if (bd.children) {
      bd.children.forEach(c => blockDevices.push(c))
      continue // skip if has children
    } 
    
    const typeIsDisk: boolean = bd.type === "disk"
    const hasNoMountPoints: boolean = bd.mountpoints[0] === null

    if (typeIsDisk && hasNoMountPoints && !checkIsPartOfBTRFS(bd.name)) {
      avaliableBlockDevices.push(bd)
    }
  }

  

  return avaliableBlockDevices
}

function checkIsPartOfBTRFS(name: string ): boolean {
  try {
    execSync(`btrfs device stats /dev/${name}`)

    return true
  } catch (e) {
    return false
  }
}