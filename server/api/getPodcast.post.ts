import type { Podcast, appToken } from '~/types'

async function fetchPodcast(appToken: appToken, pid: string) {
  const headers = {
    'x-jike-refresh-token': appToken.freshToken,
    'x-jike-device-id': appToken.deviceId,
    'x-jike-access-token': appToken.accessToken,
  }
  const url = `https://api.xiaoyuzhoufm.com/v1/podcast/get?pid=${pid}`
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
    const { appToken, pid } = await readBody(event)
    const data = await fetchPodcast(appToken, pid)
    const podcast: Podcast = {
      pid,
      title: data.title,
      author: data.author,
      description: data.description,
      picUrl: data.image.picUrl,
      episodeCount: data.episodeCount,
    }
    return podcast
  }
  catch (error) {
    console.error(error)
    throw error
  }
})
