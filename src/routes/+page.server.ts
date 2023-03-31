import type {Actions} from "@sveltejs/kit";
import {env} from "$env/dynamic/private";
import {fail, redirect} from "@sveltejs/kit";
import {sessionManager} from "../lib/tools/SessionManager";

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

    // Create the session ID
    const sm = new sessionManager()
    const sessionID = sm.createSession(getClientAddress())

    // Set the cookie for the user TODO: Detect secure
    cookies.set('sessionid', sessionID, {
      sameSite: "strict",
      httpOnly: true,
      secure: false,
      path: '/'
    })

    // After sign in, redirect to the main page
    throw redirect(303, '/App')
  }
} satisfies Actions;
