import { defineStore } from 'pinia'
import type { Episode, Podcast } from '~/types'

export const usePodcastStore = defineStore('podcast', () => {
  const podcast = ref<Podcast | null>(null)
  function setPodcast(value: Podcast) {
    podcast.value = value
  }
  return { podcast, setPodcast }
})

export const useEpisodeStore = defineStore('episode', () => {
  const episode = ref<Episode | null>(null)
  function setEpisode(value: Episode) {
    episode.value = value
  }
  return { episode, setEpisode }
})
