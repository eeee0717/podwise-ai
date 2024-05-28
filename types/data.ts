export interface Podcast {
  pid: string
  appToken: appToken
  type?: 'Podcast'
  name?: string
  episodes?: Episode[]
}

export interface Episode {
  eid: string
  appToken: appToken
  type?: 'Episode'
  title?: string
  datePublished?: Date
  description?: string
  mediaUrl?: string
  picUrl?: string
}

export interface appToken {
  accessToken: string
  deviceId: string
  freshToken: string
}
