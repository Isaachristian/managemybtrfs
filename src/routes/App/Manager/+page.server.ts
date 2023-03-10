import { redirect } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import type { PageServerLoad } from './$types';
 
// export const load = (async ({ params }) => {
//   let buf

//   try {
//     buf = await readFileSync('src/lib/loggedInUsers.txt', {encoding: 'utf8'})

//   } catch (error) {
//     console.log(error)
//   }
  
//   if (buf !== "Isaac Liljeros") {
    
//   }
// }) satisfies PageServerLoad;

// src/lib/loggedInUsers.txt