import { serverSupabaseClient } from '#supabase/server'
import type { Episode } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event)
    const { pid, episods } = await readBody(event)
    // 查询数据库中是否存在episode
    const { data: episodeData } = await supabase.from('episods').select('*').eq('pid', pid)
    let existEids: string[] = []
    if (episodeData && episodeData.length > 0) {
      existEids = episodeData.map((episode: Episode) => episode.eid) as string[]
    }
    // 过滤掉已存在的episode
    const episodsFiltered = episods.filter((episode: Episode) => !existEids.includes(episode.eid as string))
    const insertData: Episode[] = episodsFiltered.map((episode: Episode) => {
      return {
        pid,
        eid: episode.eid,
        title: episode.title,
        datePublished: episode.datePublished,
        duration: episode.duration,
        shownotes: episode.shownotes,
        mediaUrl: episode.mediaUrl,
        picUrl: episode.picUrl,
      }
    })
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const { data: responseData, error } = await supabase.from('episods').upsert(insertData).select('*')
    if (error)
      throw error
    return { data: responseData, msg: 'podcast added' }
  }
  catch (error) {
    console.error(error)
    return { data: null, msg: 'An error occurred while adding the podcast' }
  }
})
