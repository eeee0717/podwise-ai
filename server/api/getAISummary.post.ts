import type { IProvider } from '~/AI/IProvider'
import { mindmapPrompt, segPrompt, summaryPrompt } from '~/AI/Prompt'
import { ProviderFactory } from '~/AI/ProviderFactory'
import splitToChunks from '~/utils/splitToChunks'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const { transcript } = await readBody(event)
  const chunks = splitToChunks(transcript, transcript.length / 5, transcript.length / 20)

  const provider = ProviderFactory.createProvider(config)
  if (!provider) {
    throw new Error('无法初始化 AI Provider')
  }

  const responses = (await Promise.all(chunks.map(chunk => summary(provider, chunk, segPrompt)))).join('')
  // console.warn('responses', responses)

  const summaryResult = await summary(provider, responses, summaryPrompt)
  const mindMapResult = (await Promise.all(chunks.map(chunk => summary(provider, chunk, mindmapPrompt)))).join('\n')
  return { summaryResult, mindMapResult }
})

async function summary(provider: IProvider, text: string, prompt: string): Promise<string> {
  return provider.chat(text, prompt)
}
