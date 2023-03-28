import type {Actions} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";

export const actions = {
  logout: async ({cookies}) => {
    if (cookies.get('sessionid'))
      cookies.delete('sessionid', {path: '/'})

    throw redirect(303, '/')
  }
} satisfies Actions;