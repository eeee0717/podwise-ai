export interface Podcast {
  pid: string
  title?: string
  author?: string
  description?: string
  picUrl?: string
  episodeCount?: number
  loadMoreKey?: string
  episods?: Episode[]
}

export interface Episode {
  eid: string
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
