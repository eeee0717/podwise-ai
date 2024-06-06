import type { Episode, appToken } from '~/types'

async function fetchEpisode(appToken: appToken, eid: string) {
  const url = `https://api.xiaoyuzhoufm.com/v1/episode/get?eid=${eid}`
  const headers = {
    'x-jike-refresh-token': appToken.freshToken,
    'x-jike-device-id': appToken.deviceId,
    'x-jike-access-token': appToken.accessToken,
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
    const { appToken, eid } = await readBody(event)
    const data = await fetchEpisode(appToken, eid)
    const episode: Episode = {
      pid: data.pid,
      eid,
      title: data.title,
      description: data.description,
      shownotes: data.shownotes.replace(/\0/g, ''),
      datePublished: data.pubDate,
      duration: data.duration,
      mediaUrl: data.enclosure.url,
      picUrl: data.image?.picUrl ?? data.podcast.image.picUrl,
    }
    return episode
  }
  catch (error) {
    console.error(error)
    throw error
  }
})
