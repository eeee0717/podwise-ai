// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    accessToken: process.env.X_JIKE_ACCESS_TOKEN,
    deviceId: process.env.X_JIKE_DEVICE_ID,
    refreshToken: process.env.X_JIKE_REFRESH_TOKEN,
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    '@pinia/nuxt',
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
})
