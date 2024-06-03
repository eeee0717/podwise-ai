import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const body = await readBody(event)
  // 查询数据库中是否已经存在该podcast
  const { data: podcastData } = await supabase.from('podcast').select('*').eq('pid', body.pid)
  if (podcastData && podcastData.length > 0) {
    return { data: podcastData, msg: 'podcast already exists' }
  }
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const { data: responseData } = await supabase.from('podcast').insert([{
    pid: body.pid,
    title: body.title,
    author: body.author,
    description: body.description,
    picUrl: body.picUrl,
    total: body.total,
  }]).select('*')

  return { data: responseData, msg: 'podcast added' }
})
