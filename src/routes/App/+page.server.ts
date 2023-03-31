import type {Actions} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";
import {sessionManager} from "../../lib/tools/SessionManager";

export const actions = {
  logout: async ({cookies}) => {
    if (cookies.get('sessionid'))
      cookies.delete('sessionid', {path: '/'})

    const sm = new sessionManager()
    sm.removeSessions()

    throw redirect(303, '/')
  }
} satisfies Actions;