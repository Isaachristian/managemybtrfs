import { invalidateAll } from "$app/navigation";
import type { subvolume } from "$lib/interfaces/btrfs";

export async function createSubvolume(parent: subvolume, name: string, 
                                      parentPath: string): Promise<string | undefined> {
  let mp = parent.fsMountPoint + '/'
  let pp = parentPath == "" ? parentPath : parentPath + '/'

  return await createSubvolumeWithLocation(`${mp}${pp}${parent.name}/${name}`)
}

export async function createSubvolumeWithLocation(location: string): Promise<string | undefined> {
  let request = {
    location: location
  }

  const res = await fetch('API/createSubvolume', {
    method: "post",
    body: JSON.stringify(request)
  })
  
  let data = await res.json();
  if (data.error) {
    return data.error;
  } else {
    invalidateAll()
  }
}