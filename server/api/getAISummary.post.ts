import { openaiProvider } from '~/AI/Openai'
import splitToChunks from '~/utils/splitToChunks'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiKey = config.openai.apiKey
  const baseUrl = config.openai.baseUrl
  const { transcript } = await readBody(event)
  const chunks = splitToChunks(transcript, 5000, 1000)
  const provider = await getProvider(apiKey, baseUrl)
  const response = provider.chat(chunks[0])
  return response
})

async function getProvider(apiKey: string, baseUrl: string) {
  openaiProvider.init(apiKey, baseUrl)
  return openaiProvider
}
