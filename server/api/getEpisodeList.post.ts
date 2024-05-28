import type { Podcast } from '~/types'

interface Response {
  data: Array<any>
  loadMoreKey: string
  loadNextKey: string
  order: string
  total: number
}

async function fetchEpisodeList(podcast: Podcast) {
  const headers = {
    'x-jike-refresh-token': podcast.appToken.freshToken,
    'x-jike-device-id': podcast.appToken.deviceId,
    'x-jike-access-token': podcast.appToken.accessToken,
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
    const podcast: Podcast = await readBody(event)
    const response: Response = await fetchEpisodeList(podcast)
    podcast.loadMoreKey = response.loadMoreKey
    podcast.episodes = response.data.map((episode) => {
      return {
        eid: episode.eid,
        type: 'Episode',
        title: episode.title,
        datePublished: episode.pubDate,
        description: episode.description,
        mediaUrl: episode.enclosure.url,
        picUrl: episode.image.picUrl,
      }
    })
    // console.log(podcast)
    return podcast
  }
  catch (error) {
    console.error(error)
    throw error
  }
})
