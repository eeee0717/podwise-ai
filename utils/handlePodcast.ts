import type { Episode, Podcast } from '~/types'

export async function handlePodcast(pid: string, podcast: Ref<Podcast>) {
  await podcastHandler(pid, podcast)
  await episodeListHandler(podcast)
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
  await addPodcastToPg(podcast.value)
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
  await addEpisodsToPg(response as Podcast)
}

export async function handleEpisode(eid: string, episode: Ref<Episode>) {
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
  console.log(episode.value)
  await addEpisodeToPg(episode.value)
}
