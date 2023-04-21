import { invalidateAll } from "$app/navigation";
import type { RequestHandler } from "./$types";
import {execSync} from 'child_process'

export const POST = (async ({request}) => {
  try {
    let body = await request.json()
    
    let location = (body.location as string).trim()

    

    if (!/[a-zA-Z0-9/_]+$/g.test(location)) {
      return new Response(JSON.stringify({error: "Must only be alphanumeric"}))
    } else if (location.at(location.length-1) !== "/") {
      return new Response(JSON.stringify({error: "Name cannot be empty"}))
    } else {
      execSync(`sudo btrfs subvolume create ${location}`)
    }

    return new Response(JSON.stringify({success: true}))
  } catch (e) {
    return new Response(JSON.stringify({error: `${e}`}))
  }


}) satisfies RequestHandler