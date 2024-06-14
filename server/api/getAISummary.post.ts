import { doubaoProvider } from '~/AI/Doubao'
import type { IProvider } from '~/AI/IProvider'
import { openaiProvider } from '~/AI/Openai'
import splitToChunks from '~/utils/splitToChunks'

const segPrompt = '使用简短的话提取这段文字的重点.'
const summaryPrompt = '这是一个播客分段总结的内容, 请使用简短的语言总结成一个完整的内容. 以\'本期播客节目讲述了\'为开始.'
const mindMapPrompt = '我会给你一篇文章, 帮我把这篇文章的内容用思维导图的方式进行精简提炼, 并使用markdown源码格式显示. '
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  // const apiKey = config.openai.apiKey
  // const baseUrl = config.openai.baseUrl
  const apiKey = config.doubao.apiKey
  const baseUrl = config.doubao.baseUrl
  const { transcript } = await readBody(event)
  const chunks = splitToChunks(transcript, transcript.length / 5, transcript.length / 20)
  const provider = await getProvider(apiKey, baseUrl)
  // console.log('chunks', chunks)
  const responses = (await Promise.all(chunks.map(chunk => summary(provider, chunk, segPrompt)))).join('')
  console.log('responses', responses)
  const summaryResult = await summary(provider, responses, summaryPrompt)
  const mindMapResult = await summary(provider, responses, mindMapPrompt)
  return { summaryResult, mindMapResult }
})

async function summary(provider: IProvider, text: string, prompt: string) {
  const response = await provider.chat(text, prompt)
  return response
}

async function getProvider(apiKey: string, baseUrl: string) {
  // openaiProvider.init(apiKey, baseUrl)
  // return openaiProvider
  doubaoProvider.init(apiKey, baseUrl)
  return doubaoProvider
}
