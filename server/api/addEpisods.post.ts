import { serverSupabaseClient } from '#supabase/server'
import type { Episode } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event)
    const { pid, episods } = await readBody(event)
    const insertData: Episode[] = episods.map((episode: Episode) => {
      return {
        pid,
        eid: episode.eid,
        title: episode.title,
        datePublished: episode.datePublished,
        duration: episode.duration,
        description: episode.description,
        mediaUrl: episode.mediaUrl,
        picUrl: episode.picUrl,
      }
    })
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const { data: responseData, error } = await supabase.from('episods').insert(insertData).select('*')
    if (error)
      throw error
    return { data: responseData, msg: 'podcast added' }
  }
  catch (error) {
    console.error(error)
    return { msg: 'An error occurred while adding the podcast' }
  }
})
