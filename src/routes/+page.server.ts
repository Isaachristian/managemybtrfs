import type { PageServerLoad } from "./$types";
import { readFileSync } from "fs";

export const load = (async ({ params }) => {
  let buf

  console.log(`MADE IT HERE -> (${Date()})`)

  try {
    buf = await readFileSync('src/lib/loggedInUsers.txt', {encoding: 'utf8'})

  } catch (error) {
    console.log(error)
  }
  
  if (buf !== "Isaac Liljeros") {
    
  }
}) satisfies PageServerLoad;