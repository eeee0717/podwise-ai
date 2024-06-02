import { defineStore } from 'pinia'
import type { Episode, Podcast } from '~/types'

const supabase = useSupabaseClient()
export const usePodcastStore = defineStore('podcast', () => {
  const podcasts = ref<Map<string, Podcast>>(new Map())
  async function fetchPodcast(pid: string) {
    if (podcasts.value.has(pid)) {
      return
    }
    const { data: podcastData } = await supabase.from('podcast').select('*').eq('pid', pid)
    if (podcastData) {
      // 将获取到的podcastData添加到podcasts Map中
      podcasts.value.set(pid, podcastData[0])
    }
  }
  async function fetchEpisodeList(pid: string) {
    const podcast = podcasts.value.get(pid)
    if (podcast && podcast.episods && podcast.episods.length > 0) {
      return
    }
    const { data: episodesData } = await supabase.from('episods').select('*').eq('pid', pid)
    if (podcast && episodesData) {
      // 更新podcast对象中的episods属性
      podcast.episods = episodesData
      // 由于Map中的值（value）是直接赋值的引用，所以这里直接更新podcast对象即可，无需再次set到Map中
    }
  }

  return { podcasts, fetchPodcast, fetchEpisodeList }
})
