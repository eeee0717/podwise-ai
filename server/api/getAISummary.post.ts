import { openaiProvider } from '~/AI/Openai'
import splitToChunks from '~/utils/splitToChunks'

export default defineEventHandler(async (event) => {
  const { transcript } = await readBody(event)
  const chunks = splitToChunks(transcript, 5000, 1000)
  const provider = await getProvider()
  const response = provider.chat(chunks[0])
  return response
})

async function getProvider() {
  return openaiProvider
}
