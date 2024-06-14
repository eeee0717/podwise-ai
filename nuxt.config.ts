/* eslint-disable node/prefer-global/process */
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    accessToken: process.env.X_JIKE_ACCESS_TOKEN,
    deviceId: process.env.X_JIKE_DEVICE_ID,
    refreshToken: process.env.X_JIKE_REFRESH_TOKEN,
    tencent: {
      secretId: process.env.TENCENT_SECRET_ID,
      secretKey: process.env.TENCENT_SECRET_KEY,
    },
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3030',
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: process.env.OPENAI_BASE_URL,
    },
    doubao: {
      apiKey: process.env.DOUBAO_API_KEY,
      baseUrl: process.env.DOUBAO_BASE_URL,
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/supabase',

  ],
  colorMode: {
    classSuffix: '',
  },
  nitro: {
    routeRules: {
      '/*': {
        cors: true,
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      },
    },
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/'],
    },
  },

})
