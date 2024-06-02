import { defineStore } from 'pinia'
import type { Episode, Podcast } from '~/types'

const supabase = useSupabaseClient()
export const usePodcastStore = defineStore('podcast', () => {
  const podcast = ref<Podcast>({})

  async function fetchPodcast(pid: string) {
    if (podcast && podcast.value.pid === pid) {
      // 如果已经有数据且pid相同，则无需重新获取
      return
    }
    podcast.value = {}
    const { data: podcastData } = await supabase.from('podcast').select('*').eq('pid', pid)
    podcast.value = podcastData ? podcastData[0] : {}
  }
  async function fetchEpisodeList(pid: string) {
    if (podcast.value.episods && podcast.value.episods.length > 0 && podcast.value && podcast.value.pid === pid) {
      // 如果已经有数据且pid相同，则无需重新获取
      return
    }
    const { data: episodesData } = await supabase.from('episods').select('*').eq('pid', pid)
    podcast.value.episods = episodesData || []
  }

  return { podcast, fetchPodcast, fetchEpisodeList }
})
