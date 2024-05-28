import type { Podcast } from '~/types'

export default defineEventHandler(async (event) => {
  const podcast: Podcast = await readBody(event)
  console.log(podcast)
  // const response = await $fetch(podcast.url, {
  //   method: 'GET',
  // }).then(res => console.log(res))
  // return {
  //   url: podcast.url,
  // }
})
