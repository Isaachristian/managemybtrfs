import {execSync} from "child_process"
import type { RequestHandler } from './$types';
import type { checkScrubRequest, checkScrubResponse } from "$lib/interfaces/btrfs";

export const POST = (async ({request}) => {
  try {
    const {location}: checkScrubRequest = await request.json()

    let buf = execSync(`sudo btrfs scrub status ${location}`)

    const resp: checkScrubResponse = getResponse(buf.toString())

    return new Response(JSON.stringify(resp))
  } catch (e) {
    const resp: checkScrubResponse = { success: false, error: `${e as string}` }
    return new Response(JSON.stringify(resp))
  }
}) satisfies RequestHandler


/*

UUID:             aff354e5-ba36-4817-8a60-aa0a9c41bae3
Scrub started:    Tue Apr 25 17:12:01 2023
Status:           running
Duration:         0:01:00
Time left:        0:40:34
ETA:              Tue Apr 25 17:53:39 2023
Total to scrub:   958.84GiB
Bytes scrubbed:   23.06GiB  (2.41%)
Rate:             393.64MiB/s
Error summary:    no errors found

*/

function getResponse(buf: string): checkScrubResponse {
  if (buf.search("running") >= 0) {
    let tokens = buf.split('\n').filter(s => s.trim() != "").map(s => s.trim())

    let progress: number = 0
    for (let token of tokens) {
      if (token.search("Bytes scrubbed:") > -1) {
        let start = token.split("").findIndex(c => c === "(") + 1
        let end = token.length - 1

        progress = Number.parseFloat(token.slice(start, end))
      }
    }

    return {
      success: true,
      complete: false,
      progress: progress
    }
  }

  return {
    success: true,
    complete: true,
  }
}