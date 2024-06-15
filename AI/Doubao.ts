import type { IHttpProvider, IProvider } from './IProvider'

// export const doubaoProvider: IProvider = {
//   apiKey: '',
//   baseUrl: '',
//   init(apiKey, baseUrl): void {
//     this.apiKey = apiKey
//     this.baseUrl = baseUrl
//   },

//   /// model
//   /// doubao-pro-4k ep-20240614093316-fq8rv
//   /// doubao-lite-4k ep-20240614092536-r6d7j

//   async chat(text: string, prompt: string): Promise<string> {
//     const chatCompletion: any = await $fetch(`${this.baseUrl}/chat/completions`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${this.apiKey}`,
//       },
//       body: JSON.stringify({
//         messages: [
//           { role: 'system', content: prompt },
//           { role: 'user', content: text },
//         ],
//         model: 'ep-20240614093316-fq8rv',
//       }),
//     })
//     const response = chatCompletion.choices[0].message.content
//     if (!response)
//       throw new Error('No response from OpenAI')
//     return Promise.resolve(response)
//   },
// }

export class DoubaoProvider implements IHttpProvider {
  apiKey?: string
  baseUrl?: string

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  /// model
  /// doubao-pro-4k ep-20240614093316-fq8rv
  /// doubao-lite-4k ep-20240614092536-r6d7j
  async chat(text: string, prompt: string): Promise<string> {
    const chatCompletion: any = await $fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: text },
        ],
        model: 'ep-20240614093316-fq8rv',
      }),
    })
    const response = chatCompletion.choices[0].message.content
    if (!response)
      throw new Error('No response from OpenAI')
    return response
  }
}
