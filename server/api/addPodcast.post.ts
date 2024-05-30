import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const body = await readBody(event)
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const { data, error } = await supabase.from('podcast').insert([{
    pid: body.pid,
    title: body.title,
    author: body.author,
    description: body.description,
    picUrl: body.picUrl,
  }]).select('*')
  console.log(data, error)
  return { data, error }
})
