export const btrfsProfiles: profile[] = [
  { 
    name: "Single",  
    description: "", 
    minDrive: 1 
  }, { 
    name: "RAID0",   
    description: "", 
    minDrive: 1, 
    maxDrive: 5
  }, { 
    name: "RAID1",   
    description: "", 
    minDrive: 2
  }, { 
    name: "RAID1C3", 
    description: "", 
    minDrive: 3 
  }, { 
    name: "RAID1C4", 
    description: "", 
    minDrive: 4 
  }, { 
    name: "RAID10",  
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
}