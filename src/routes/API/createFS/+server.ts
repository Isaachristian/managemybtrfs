import type { blockDevice } from "$lib/interfaces/btrfs";
import {execSync} from "child_process"
import type { RequestHandler } from './$types';

export const POST = (async ({request}) => {
  try {
    const data = await request.json()

    if (true) {
      // get data
      

      // create the file system
      execSync(`sudo mkfs.btrfs -d ${raid1} -m ${raid1} /dev/sdb /dev/sdc`)

      // get the uuid of the filesystem

      // mount the filesystem

      // write mount to fstab for future

      // Let the user know if it was successful 
      return new Response(JSON.stringify(avaliableBlockDevices))
    } else {
      throw("No failed to get devices")
    }

  } catch (e) {
    console.error(e);

    return new Response(e as string)
  }
}) satisfies RequestHandler