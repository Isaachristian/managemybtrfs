import { sessionManager } from '$lib/tools/SessionManager';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  let sm = new sessionManager()


  if (!sm.validSession(event.cookies.get('sessionid') ?? '', event.getClientAddress()) && 
      event.url.pathname !== '/') {
    throw redirect(303, '/')
  }

  return await resolve(event)
}) satisfies Handle