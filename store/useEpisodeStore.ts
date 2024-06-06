import type { Episode } from '~/types'

export const useEpisodeStore = defineStore('episode', () => {
  const episode = ref<Episode>({})

  function setEpisode(newEpisode: Episode) {
    episode.value = newEpisode
  }
  return { episode, setEpisode }
})
