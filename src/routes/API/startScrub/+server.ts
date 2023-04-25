import {execSync} from "child_process"
import type { RequestHandler } from './$types';
import type { startScrubRequest, startScrubResponse } from "$lib/interfaces/btrfs";

export const POST = (async ({request}) => {
  try {
    const {location}: startScrubRequest = await request.json()

    execSync(`sudo btrfs scrub start ${location}`)

    let resp: startScrubResponse = {
      success: true
    }

    return new Response(JSON.stringify(resp))
  } catch (e) {
    let error: string = e as string

    return new Response(JSON.stringify({ success: false, message: `${error}` }))
  }
}) satisfies RequestHandler