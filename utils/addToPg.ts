import type { Episode, Podcast } from '~/types'

export async function addPodcastToPg(podcast: Podcast) {
  const { data, msg } = await $fetch('/api/addPodcast', {
    method: 'POST',
    body: JSON.stringify({
      pid: podcast.pid,
      title: podcast.title,
      author: podcast.author,
      description: podcast.description,
      picUrl: podcast.picUrl,
      total: podcast.total,
    }),
  })
  console.log(data, msg)
}

export async function addEpisodsToPg(podcast: Podcast) {
  const { data, msg } = await $fetch('/api/addEpisods', {
    method: 'POST',
    body: JSON.stringify({
      pid: podcast.pid,
      episods: podcast.episods,
    }),
  })
  console.log(data, msg)
}

export async function addEpisodeToPg(episode: Episode) {
  const { data, msg } = await $fetch('/api/addEpisode', {
    method: 'POST',
    body: JSON.stringify({
      episode,
    }),
  })
  console.log(data, msg)
}
