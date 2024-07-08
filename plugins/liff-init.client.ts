import liff from '@line/liff'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (!config.public.liffId) {
    console.info('LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.')

    return
  }

  const initResult = liff.init({ liffId: config.public.liffId })
    .then(() => {
      console.log('liff.init() done')
    })
    .catch(error => {
      console.log(`liff.init() failed: ${error}`)

      return Promise.reject(error)
    })

  return {
    provide: {
      liffInit: initResult,
    },
  }
})
