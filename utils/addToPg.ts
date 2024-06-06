import type { Episode, Podcast } from '~/types'

export async function addPodcastToPg(podcast: Podcast) {
  await addToPg('/api/addPodcast', {
    pid: podcast.pid,
    title: podcast.title,
    author: podcast.author,
    description: podcast.description,
    picUrl: podcast.picUrl,
    total: podcast.total,
  })
}

export async function addEpisodsToPg(podcast: Podcast) {
  await addToPg('/api/addEpisods', {
    pid: podcast.pid,
    episods: podcast.episods,
  })
}

export async function addEpisodeToPg(episode: Episode) {
  await addToPg('/api/addEpisode', { episode })
}

// 通用的添加数据到数据库的函数
async function addToPg(url: string, body: object) {
  const response = await $fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  })
  // 假设当操作失败时，服务器会在msg中返回一个明确的错误消息
  if (!response) {
    throw new Error('Unknown error occurred during database operation')
  }
  console.error(response)
}
