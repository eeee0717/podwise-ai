import OpenAI from 'openai'
import type { IProvider } from './IProvider'

export const openaiProvider: IProvider = {
  async chat(text: string): Promise<string> {
    const config = useRuntimeConfig()
    const openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: config.public.providers.openai.apiKey,
      baseURL: config.public.providers.openai.baseUrl,
    })
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: text }],
      model: 'gpt-3.5-turbo',
    })
    const response = chatCompletion.choices[0].message.content
    if (!response)
      throw new Error('No response from OpenAI')
    return Promise.resolve(response)
  },
}
