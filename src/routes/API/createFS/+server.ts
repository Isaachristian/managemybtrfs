import { btrfsProfiles, type blockDevice, type createFS } from "$lib/interfaces/btrfs";
import {execSync} from "child_process"
import fs from "fs"
import type { RequestHandler } from './$types';
import { getAvailableBlockDevices } from "$lib/tools/getBlockDevice";

export const POST = (async ({request}) => {
  try {
    const {profile, devices, path}: createFS = await request.json()

    let vp: string = verifyProfile(profile.name)
    let vd: string = verifyDevices(devices)

    execSync(`mkfs.btrfs -d ${vp} -m ${vp} ${vd}`)

    const uuid: string = getCreatedFSUUID(devices[0].name)
    execSync(`mkdir -p ${path}`)

    execSync(`mount /dev/${devices[0].name} ${path}`)

    fs.appendFileSync(
      '/etc/fstab', 
      `UUID=${uuid} ${path} btrfs defaults 0 0\n`
    )

    return new Response(JSON.stringify({ success: true }))
  } catch (e) {
    let error: string = e as string

    // if (error.search("ERROR: ") > 0)
    //   console.log(error)

    return new Response(JSON.stringify({ success: false, message: `${error}` }))
  }
}) satisfies RequestHandler


/**
 * 
 * @param profile 
 * @returns 
 */
function verifyProfile(profile: string): string {
  const storedProfile = btrfsProfiles.find(p => p.name == profile)
  
  if (storedProfile) {
    return storedProfile.name
  }
  
  throw("Invalid Profile")
}


/**
 * 
 * @param devices 
 * @returns 
 */
function verifyDevices(devices: blockDevice[]): string {
  const verifiedDevices = getAvailableBlockDevices()
  let cnt = 0
  let result = ""

  for (let device of devices) {
    if (verifiedDevices.find(vd => vd.name == device.name)) {
      result = result + `/dev/${device.name} `
    }
    cnt++
  }

  if (cnt == devices.length) {
    return result.trim()
  } else {
    throw("Could not verify every device")
  }
}


/**
 * 
 * @param deviceName 
 * @returns 
 */
function getCreatedFSUUID(deviceName: string): string {
  let uuid = ""

  let buf = execSync("sudo btrfs filesystem show")
  let tokens = buf.toString().split(/[ \t\n]/).map(t => t.trim()).filter(t => t !== "")

  let index = tokens.findIndex(t => t == `/dev/${deviceName}`)

  for (; index >= 0; index--) {
    if (tokens[index] === "uuid:") {
      return tokens[index+1]
    }
  }

  if (uuid === "") {
    throw("Could not find filesystem")
  }
  

  return uuid
}