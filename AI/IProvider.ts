export interface IProvider {
  provider?: any
  apiKey?: string
  baseUrl?: string
  init: (apiKey: string, baseUrl: string) => void
  chat: (text: string, prompt: string) => Promise<string>
}
