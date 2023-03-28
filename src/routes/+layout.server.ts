import type {PageServerLoad} from './$types';
import {redirect} from "@sveltejs/kit";
import {readFileSync, writeFileSync} from "fs";

export const load: PageServerLoad = (async ({ cookies, url, getClientAddress}) => {
  // Get Stored session
  const buf = readFileSync('session.temp')
  const storedSession = buf.toString().split('|')
  const storedSessionid = storedSession[0]
  const expirationDate = new Date(storedSession[1])
  const previousLocation: string = storedSession[2]

  // Get the sessionid and check if the session is valid
  const sessionid = cookies.get('sessionid')
  const sessionValid = sessionid === storedSessionid
    && (new Date()).getTime() < (expirationDate).getTime()
    && previousLocation === getClientAddress()

  // If the session is valid, renew it; if not remove it and redirect to the login page
  if (sessionValid) {
    if (url.pathname === '/')
      throw redirect(303, '/App')

    const inOneHour = new Date((new Date()).getTime() + 60 * 60 * 1000)
    writeFileSync('session.temp', `${sessionid}|${inOneHour}|${previousLocation}`)
  } else if ( url.pathname !== '/') {
    writeFileSync('session.temp', '')
    throw redirect(303, '/')
  }
})