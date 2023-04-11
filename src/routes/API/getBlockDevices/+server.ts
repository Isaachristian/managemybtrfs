import type { blockDevice } from "$lib/interfaces/btrfs";
import {execSync} from "child_process"
import type { RequestHandler } from './$types';

export const GET = (() => {
  try {
    let buf = execSync("lsblk --json")
  
    let blockDevices: blockDevice[] = JSON.parse(buf.toString())?.blockdevices

    if (blockDevices) {  
      let avaliableBlockDevices: blockDevice[] = []
      for (let bd of blockDevices) {
        if (bd.children) {
          for (let child of bd.children) {
            blockDevices.push(child)
          }
        } else if (bd.type === "disk" && bd.mountpoints[0] === null) {
          avaliableBlockDevices.push(bd)
        }
      }

      return new Response(JSON.stringify(avaliableBlockDevices))
    } else {
      throw("No failed to get devices")
    }

  } catch (e) {
    console.error(e);

    return new Response(e as string)
  }
}) satisfies RequestHandler