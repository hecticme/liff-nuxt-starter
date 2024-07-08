// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-07-08',
  runtimeConfig: {
    public: {
      liffId: process.env.NUXT_LIFF_ID,
    },
  },
})
