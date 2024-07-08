import liff from '@line/liff'

export default defineNuxtPlugin(() => {
  if (!process.env.LIFF_ID) {
    console.info('LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.')

    return
  }

  const initResult = liff.init({ liffId: process.env.LIFF_ID })
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
