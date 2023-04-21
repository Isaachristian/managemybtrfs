import { invalidateAll } from "$app/navigation";
import type { RequestHandler } from "./$types";
import {execSync} from 'child_process'

export const POST = (async ({request}) => {
  try {
    let body = await request.json()
    
    let location = body.location
    if (/[a-zA-Z0-9/_]+$/g.test(location)) {
      execSync(`sudo btrfs subvolume create ${location}`)
    } else {
      return new Response(JSON.stringify({error: "Must only be alphanumeric"}))
    }

    return new Response(JSON.stringify({success: true}))
  } catch (e) {
    return new Response(JSON.stringify({error: `${e}`}))
  }


}) satisfies RequestHandler