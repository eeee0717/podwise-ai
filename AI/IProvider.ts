export interface IProvider {
  provider: any
  init: (apiKey: string, baseUrl: string) => void
  chat: (text: string) => Promise<string>
}
