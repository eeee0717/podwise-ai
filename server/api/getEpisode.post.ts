import type { Episode } from '~/types'

export default defineEventHandler(async (event) => {
  const episode: Episode = await readBody(event)
  const url = `https://api.xiaoyuzhoufm.com/v1/episode/get?eid=${episode.eid}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-jike-refresh-token': episode.appToken.freshToken,
      'x-jike-device-id': episode.appToken.deviceId,
      'x-jike-access-token': episode.appToken.accessToken,
    },
  }).then(res => res.json())
  episode.title = response.data.title
  episode.description = response.data.description
  episode.datePublished = response.data.pubDate
  episode.mediaUrl = response.data.enclosure.url
  episode.picUrl = response.data.image.picUrl
  return episode
})
