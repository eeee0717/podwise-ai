import type { Episode, Podcast } from '~/types'

export async function handlePodcast(pid: string) {
  const podcast = ref<Podcast>({})
  await podcastHandler(pid, podcast)
  await episodeListHandler(podcast)
  await addPodcastToPg(podcast.value)
  await addEpisodsToPg(podcast.value)
}
export async function handleEpisode(eid: string) {
  const podcast = ref<Podcast>({})
  const episode = ref<Episode>({})
  await episodeHandler(eid, episode)
  await podcastHandler(episode.value.pid as string, podcast)
  await addPodcastToPg(podcast.value)
  await addEpisodeToPg(episode.value)
}

async function podcastHandler(pid: string, podcast: Ref<Podcast>) {
  const data = {
    pid,
    appToken: getAppToken(),
  }

  const response = await $fetch('/api/getPodcast', {
    method: 'POST',
    body: JSON.stringify(data),
  }).catch((err) => {
    return err
  })
  if (response === null)
    return null
  podcast.value = response as Podcast
}

async function episodeListHandler(podcast: Ref<Podcast>) {
  const data = {
    podcast: podcast.value,
    appToken: getAppToken(),
  }
  const response = await $fetch('/api/getEpisodeList', {
    method: 'POST',
    body: JSON.stringify(data),
  }).catch((err) => {
    return err
  })
  if (response === null)
    return null

  podcast.value.loadMoreKey = response.loadMoreKey
  podcast.value.episods = response.episods
  // console.log('response', response)
}

async function episodeHandler(eid: string, episode: Ref<Episode>) {
  const data = {
    eid,
    appToken: getAppToken(),
  }
  const response = await $fetch('/api/getEpisode', {
    method: 'POST',
    body: JSON.stringify(data),
  }).catch((err) => {
    return err
  })
  if (response === null)
    return null
  episode.value = response as Episode
  // console.log(episode.value)
}
