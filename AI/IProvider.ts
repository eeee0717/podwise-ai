export interface IProvider {
  chat: (text: string) => Promise<string>
}
