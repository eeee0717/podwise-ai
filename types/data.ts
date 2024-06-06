export interface Podcast {
  pid?: string
  title?: string
  author?: string
  description?: string
  picUrl?: string
  loadMoreKey?: string
  episods?: Episode[]
  total?: number
}

export interface Episode {
  pid?: string
  eid?: string
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
