export interface Podcast {
  pid: string
  appToken: appToken
  type?: 'Podcast'
  title?: string
  author?: string
  description?: string
  picUrl?: string
  loadMoreKey?: string
  episodes?: Episode[]
}

export interface Episode {
  eid: string
  appToken?: appToken
  type?: 'Episode'
  title?: string
  datePublished?: Date
  duration?: number
  description?: string
  mediaUrl?: string
  picUrl?: string
}

export interface appToken {
  accessToken: string
  deviceId: string
  freshToken: string
}
