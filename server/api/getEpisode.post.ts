import type { Episode } from '~/types'

export default defineEventHandler(async (event) => {
  const episode: Episode = await readBody(event)
  const response = await $fetch(episode.url, {
    method: 'GET',
  }).then(res => console.log(res))
  return { url: episode.url }
})
