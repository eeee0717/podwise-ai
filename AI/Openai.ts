import OpenAI from 'openai'
import type { ISDKProvider } from './IProvider'

export class OpenAIProvider implements ISDKProvider {
  provider: OpenAI

  constructor(apiKey: string, baseUrl: string) {
    console.warn('OpenAIProvider', apiKey, baseUrl)
    this.provider = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey,
      baseURL: baseUrl,
    })
  }

  async chat(text: string, prompt: string): Promise<string> {
    const chatCompletion = await this.provider.chat.completions.create({
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: text },
      ],
      model: 'gpt-3.5-turbo',
    })
    const response = chatCompletion.choices[0].message.content
    if (!response)
      throw new Error('No response from OpenAI')
    return response
  }
}
