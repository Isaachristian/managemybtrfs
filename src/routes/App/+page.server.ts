import type {Actions, Load} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";
import {sessionManager} from "../../lib/tools/SessionManager";
import type { PageServerLoad } from "../$types";
import { getFilesystems } from "$lib/tools/getFileSystems";

export const load = (() => {
  return {
    async: {
      fileSystems: getFilesystems()
    }
  }
}) satisfies PageServerLoad;

export const actions = {
  logout: async ({cookies}) => {
    if (cookies.get('sessionid'))
      cookies.delete('sessionid', {path: '/'})

    const sm = new sessionManager()
    sm.removeSessions()

    throw redirect(303, '/')
  }
} satisfies Actions;