export const btrfsProfiles: profile[] = [
  { 
    name: "single",  
    description: "", 
    minDrive: 1 
  }, { 
    name: "raid0",   
    description: "", 
    minDrive: 1, 
    maxDrive: 5
  }, { 
    name: "raid1",   
    description: "", 
    minDrive: 2
  }, { 
    name: "raid1c3", 
    description: "", 
    minDrive: 3 
  }, { 
    name: "raid1c4", 
    description: "", 
    minDrive: 4 
  }, { 
    name: "raid10",  
    description: "", 
    minDrive: 2
  },
]

export interface profile {
  name: string
  description: string
  minDrive: number
  maxDrive?: number
}

export interface selectedDrive {
  drive: drive | null
}

export interface drive {
  name: string
}

export interface blockDevice {
  name: string
  "maj:min": string
  rm: boolean
  size: "string"
  ro: boolean
  type: string
  mountpoints: string[] | [null]
  children?: blockDevice[]
}

export interface blockDevices {
  blockdevices: blockDevice[]
}

export interface createFS {
  profile: profile
  devices: blockDevice[]
  path: string
  label: string
}


export interface startScrubRequest {
  location: string
}

export interface startScrubResponse {
  success: boolean
  message?: string
}

export interface checkScrubRequest {
  location: string
}

export interface checkScrubResponse {
  success: boolean
  error?: string
  complete?: boolean
  progress?: number
}


export interface fileSystem {
	label: string
  device: string
	mountpoint: string
  uuid: string
  subvolumes: subvolume[]
}

export interface subvolume {
  name: string
  subvolumes: subvolume[]
  fsMountPoint: string
}