// export interface IProvider {
//   provider?: any
//   apiKey?: string
//   baseUrl?: string
//   init: (apiKey: string, baseUrl: string) => void
//   chat: (text: string, prompt: string) => Promise<string>
// }

export interface IProvider {
  apiKey?: string
  baseUrl?: string
  chat: (text: string, prompt: string) => Promise<string>
}

// 对于需要SDK的实现
export interface ISDKProvider extends IProvider {
  provider: any // 尽可能使用更具体的类型而非 any
  // 其他特定于 SDK 的方法和属性
}

// 对于需要 HTTP 请求的实现
export interface IHttpProvider extends IProvider {
  // HTTP 请求相关的属性，如 headers
  // 其他特定于 HTTP 请求的方法和属性
}
