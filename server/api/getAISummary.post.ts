import type { IProvider } from '~/AI/IProvider'
import { openaiProvider } from '~/AI/Openai'
import splitToChunks from '~/utils/splitToChunks'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiKey = config.openai.apiKey
  const baseUrl = config.openai.baseUrl
  const { transcript } = await readBody(event)
  const chunks = splitToChunks(transcript, 3000, 500)
  const provider = await getProvider(apiKey, baseUrl)
  // console.log('chunks', chunks)
  const responses = await Promise.all(chunks.map(chunk => summarySegment(provider, chunk)))
  return responses
})

async function summarySegment(provider: IProvider, text: string) {
  const response = await provider.chat(text)
  console.log('response', response)
  return response
}

async function getProvider(apiKey: string, baseUrl: string) {
  openaiProvider.init(apiKey, baseUrl)
  return openaiProvider
}
