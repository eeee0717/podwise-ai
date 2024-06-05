import type { Episode, Podcast } from '~/types'

export async function handlePodcast(pid: string) {
  const podcast = await fetchAndProcess<Podcast>('/api/getPodcast', { pid })
  if (!podcast) {
    throw new Error('Podcast not found')
  }
  await episodeListHandler(podcast)
  await addPodcastToPg(podcast)
  await addEpisodsToPg(podcast)
}

export async function handleEpisode(eid: string) {
  const episode = await fetchAndProcess<Episode>('/api/getEpisode', { eid })
  if (!episode) {
    throw new Error('Episode not found')
  }
  const podcast = await fetchAndProcess<Podcast>('/api/getPodcast', { pid: episode.pid })
  if (!podcast) {
    throw new Error('Podcast not found')
  }
  await addPodcastToPg(podcast)
  await addEpisodeToPg(episode)
}

async function fetchAndProcess<T>(url: string, data: object): Promise<T | null> {
  const response = await $fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...data, appToken: getAppToken() }),
  })
  return response ? (response as T) : null
}

async function episodeListHandler(podcast: Podcast) {
  const response = await fetchAndProcess<{ episods: Episode[] }>('/api/getEpisodeList', {
    podcast,
  })
  if (response === null)
    return null
  podcast.episods = response.episods
}
