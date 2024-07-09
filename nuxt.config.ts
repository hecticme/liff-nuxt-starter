// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-07-08',
  css: [
    '~/assets/css/main.css',
  ],
  runtimeConfig: {
    public: {
      liffId: process.env.LIFF_ID,
    },
  },
})
