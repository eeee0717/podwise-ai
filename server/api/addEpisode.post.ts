import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event)
    const { episode } = await readBody(event)
    // 查询数据库中是否存在episode
    const { data: episodeData } = await supabase.from('episods').select('*').eq('eid', episode.eid)
    if (episodeData && episodeData?.length > 0) {
      return { data: episodeData, msg: 'episode exist' }
    }
    const insertData = {
      pid: episode.pid,
      eid: episode.eid,
      title: episode.title,
      datePublished: episode.datePublished,
      duration: episode.duration,
      description: episode.description,
      shownotes: episode.shownotes,
      mediaUrl: episode.mediaUrl,
      picUrl: episode.picUrl,
    }
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const { data: responseData, error } = await supabase.from('episods').insert(insertData).select('*')
    if (error)
      throw error
    return { data: responseData, msg: 'episode added' }
  }
  catch (error) {
    console.error(error)
    return { data: null, msg: 'An error occurred while adding the podcast' }
  }
})
