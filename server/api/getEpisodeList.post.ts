import type { Podcast, appToken } from '~/types'

interface Response {
  data: Array<any>
  loadMoreKey: string
  loadNextKey: string
  order: string
  total: number
}

async function fetchEpisodeList(appToken: appToken, podcast: Podcast) {
  const headers = {
    'x-jike-refresh-token': appToken.freshToken,
    'x-jike-device-id': appToken.deviceId,
    'x-jike-access-token': appToken.accessToken,
  }
  let body = JSON.stringify({ pid: podcast.pid })
  if (podcast.loadMoreKey) {
    body = JSON.stringify({ pid: podcast.pid, loadMoreKey: podcast.loadMoreKey })
  }
  const url = 'https://api.xiaoyuzhoufm.com/v1/episode/list'
  const response: Response = await $fetch(url, {
    method: 'POST',
    headers,
    body,
  })

  return response
}

export default defineEventHandler(async (event) => {
  try {
    const { podcast, appToken } = await readBody(event)
    if (!podcast.episods) {
      podcast.episods = []
    }
    let episods = []
    while (podcast.episods.length < podcast.episodeCount) {
      const response: Response = await fetchEpisodeList(appToken, podcast)
      podcast.loadMoreKey = response.loadMoreKey
      episods = response.data.map((episode) => {
        return {
          eid: episode.eid,
          title: episode.title,
          datePublished: episode.pubDate,
          duration: episode.duration,
          description: episode.description,
          mediaUrl: episode.enclosure.url,
          picUrl: episode.image?.picUrl || podcast.picUrl,
        }
      })
      podcast.episods = podcast.episods ? podcast.episods.concat(episods) : episods
    }
    podcast.loadMoreKey = null
    return podcast
  }
  catch (error) {
    console.error(error)
    throw error
  }
})
