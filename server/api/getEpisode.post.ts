import type { Episode } from '~/types'

async function fetchEpisode(episode: Episode) {
  const url = `https://api.xiaoyuzhoufm.com/v1/episode/get?eid=${episode.eid}`
  const headers = {
    'x-jike-refresh-token': episode.appToken!.freshToken,
    'x-jike-device-id': episode.appToken!.deviceId,
    'x-jike-access-token': episode.appToken!.accessToken,
  }
  const response = await fetch(url, { method: 'GET', headers })
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`)
  }
  const data = await response.json()
  if (!data || typeof data !== 'object') {
    throw new Error('Response data is not valid')
  }
  return data.data
}

export default defineEventHandler(async (event) => {
  try {
    const episode: Episode = await readBody(event)
    const data = await fetchEpisode(episode)
    episode.title = data.title
    episode.description = data.description
    episode.datePublished = data.pubDate
    episode.mediaUrl = data.enclosure.url
    episode.picUrl = data.image.picUrl
    return episode
  }
  catch (error) {
    console.error(error)
    throw error
  }
})
