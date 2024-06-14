export interface IProvider {
  provider: any
  init: (apiKey: string, baseUrl: string) => void
  chat: (text: string, prompt: string) => Promise<string>
}
