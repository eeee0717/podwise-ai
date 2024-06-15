import type { RuntimeConfig } from 'nuxt/schema'
import type { IProvider } from '~/AI/IProvider'
import { DoubaoProvider } from '~/AI/Doubao'
import { OpenAIProvider } from '~/AI/OpenAI'

export class ProviderFactory {
  static createProvider(config: RuntimeConfig): IProvider | null {
    switch (config.useProvider) {
      case 'doubao':
        return new DoubaoProvider(config.doubao.apiKey, config.doubao.baseUrl)
      case 'openai':
        return new OpenAIProvider(config.openai.apiKey, config.openai.baseUrl)
      default:
        console.error('Unsupported provider:', config.useProvider)
        return null
    }
  }
}
