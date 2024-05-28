import type { Podcast } from '~/types'

async function fetchPodcast(podcast: Podcast) {
  const headers = {
    'x-jike-refresh-token': podcast.appToken.freshToken,
    'x-jike-device-id': podcast.appToken.deviceId,
    'x-jike-access-token': podcast.appToken.accessToken,
  }
  const url = `https://api.xiaoyuzhoufm.com/v1/podcast/get?pid=${podcast.pid}`
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
    const podcast: Podcast = await readBody(event)
    const data = await fetchPodcast(podcast)
    podcast.title = data.title
    podcast.author = data.author
    podcast.description = data.description
    podcast.picUrl = data.image.picUrl
    return podcast
  }
  catch (error) {
    console.error(error)
    throw error
  }
})
