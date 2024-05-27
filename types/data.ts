export interface Podcast {
  url: string
  type: 'Podcast'
  name: string
  episodes: Episode[]
}

export interface Episode {
  url: string
  type: 'Episode'
  name: string
  datePublished: Date
  description: string
  contentUrl: string
}
