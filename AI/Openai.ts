import OpenAI from 'openai'
import type { IProvider } from './IProvider'

export const openaiProvider: IProvider = {
  provider: null,
  init(apiKey, baseUrl): void {
    this.provider = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey,
      baseURL: baseUrl,
    })
  },
  async chat(text: string): Promise<string> {
    const chatCompletion = await this.provider.chat.completions.create({
      messages: [{ role: 'user', content: text }],
      model: 'gpt-3.5-turbo',
    })
    const response = chatCompletion.choices[0].message.content
    if (!response)
      throw new Error('No response from OpenAI')
    return Promise.resolve(response)
  },
}
