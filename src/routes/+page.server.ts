import type {Actions} from "@sveltejs/kit";
import {env} from "$env/dynamic/private";
import {fail, redirect} from "@sveltejs/kit";
import { v4 as uuidv4 } from 'uuid';
import { writeFileSync } from 'fs'

export const actions = {
  default: async ({cookies, request, getClientAddress}) => {
    // Get username and password from api
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')

    // get correct username and password
    const correctUsername = env.USERNAME
    const correctPassword = env.PASSWORD

    // Ensure that Username & Password were submitted
    if (!username) return fail(400, { username, message: 'Username Required' })
    if (!password) return fail(400, { username, message: 'Password Required' })
    if (correctUsername !== username || correctPassword !== password)
      return fail(400, { username, message: 'Username or Password incorrect' })

    // Create the sessionid
    const inOneHour = new Date((new Date()).getTime() + 60 * 60 * 1000)
    const inTenSeconds = new Date((new Date()).getTime() + 10 * 1000)
    const sessionid = uuidv4()

    // Save the sessionid to a local file
    saveToSessionList(sessionid, inTenSeconds, getClientAddress())

    // Set the cookie for the user
    cookies.set('sessionid', sessionid, {
      expires: inOneHour,
      sameSite: "strict",
      httpOnly: true
    })

    // After sign in, redirect to the main page
    throw redirect(303, '/App')
  }
} satisfies Actions;


function saveToSessionList(sessionid: string, expire: Date, clientIP: string): void {
  writeFileSync('session.temp', `${sessionid}|${expire}|${clientIP}`)
}