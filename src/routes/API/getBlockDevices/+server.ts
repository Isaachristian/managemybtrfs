import type { blockDevice } from "$lib/interfaces/btrfs";
import { getAvailableBlockDevices } from "$lib/tools/getBlockDevice";
import type { RequestHandler } from './$types';

export const GET = (() => {
  try {
    const avaliableBlockDevices = getAvailableBlockDevices();
    return new Response(JSON.stringify(avaliableBlockDevices))
  } catch (e) {
    console.error(e);
    return new Response(e as string)
  }
}) satisfies RequestHandler