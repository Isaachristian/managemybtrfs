import type {PageServerLoad} from './$types';
import {redirect} from "@sveltejs/kit";
import {sessionManager} from "../lib/tools/SessionManager";

export const load: PageServerLoad = (async ({ cookies, url, getClientAddress}) => {
  const sm = new sessionManager()

  if (sm.validSession(cookies.get('sessionid') ?? '', getClientAddress())) {
    if (url.pathname === '/') {
      throw redirect(303, '/App')
    }
  } else if ( url.pathname !== '/') {
    throw redirect(303, '/')
  }
})
