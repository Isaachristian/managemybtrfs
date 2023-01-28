import type { RequestHandler } from "./$types";
import { execSync } from 'child_process'
import { json } from "@sveltejs/kit";

export const GET = (({ url }) => {
  const buf: string = execSync('pwd').toString();

  const lsResult: string = buf.split('\n').join(" | ")
  
  return json(buf.split('\n').join(" | "));
}) satisfies RequestHandler;