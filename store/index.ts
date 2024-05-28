import { defineStore } from 'pinia'
import type { Episode, Podcast } from '~/types'

export const usePodcastStore = defineStore('podcast', () => {
  const podcast = ref<Podcast | null>(null)
  function setPodcastDetails(value: Podcast) {
    if (!podcast.value)
      podcast.value = {} as Podcast
    podcast.value.loadMoreKey = value.loadMoreKey
    podcast.value.episodes = value.episodes
  }
  function setPodcastInfo(value: Podcast) {
    if (!podcast.value)
      podcast.value = {} as Podcast
    podcast.value.pid = value.pid
    podcast.value.appToken = value.appToken
    podcast.value.title = value.title
    podcast.value.author = value.author
    podcast.value.description = value.description
    podcast.value.picUrl = value.picUrl
  }
  return { podcast, setPodcastInfo, setPodcastDetails }
})

export const useEpisodeStore = defineStore('episode', () => {
  const episode = ref<Episode | null>(null)
  function setEpisode(value: Episode) {
    episode.value = value
  }
  return { episode, setEpisode }
})
