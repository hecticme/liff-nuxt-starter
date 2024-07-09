<script setup lang="ts">
import liff from '@line/liff'

useHead({
  title: 'LIFF + Nuxt',
  meta: [
    {
      name: 'description',
      content: 'A LIFF web app built with Nuxt.',
    },
  ],
})

const { $liffInit } = useNuxtApp()

const liffAppInformation = reactive({
  version: '',
  os: '',
  user: '',
  profile: '',
})

onMounted(() => {
  $liffInit
    .then(async () => {
      Object.assign(liffAppInformation, {
        version: liff.getVersion(),
        os: liff.getOS(),
        user: liff.getIDToken(),
      })

      const liffProfile = await liff.getProfile()

      Object.assign(liffAppInformation, {
        profile: liffProfile,
      })
    })
    .catch(error => {
      console.log(error)
    })
})
</script>

<template>
  <div id="app">
    <main class="main-container">
      <ul class="details">
        <li
          v-for="(value, property, index) in liffAppInformation"
          :key="index"
          class="detail"
        >
          <span class="detail-label">{{ property }}: </span>

          <span>{{ value }}</span>
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
}

.main-container {
  width: calc(100% - 2rem);
  max-width: 80rem;
  flex: 1;
  background-color: white;
  padding-inline: 1rem;
  border-inline: 1px solid #e5e7eb;
}

.details {
  list-style: none;
  background-color: #f2f3f4;
  border: 0.0625rem solid #d3d3d3;
  margin-block-start: 4rem;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 80%;
  max-width: 35rem;
}

.detail {
  padding-inline: 1rem;
  padding-block: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 250ms ease-in-out;
}

.detail:is(:focus-visible, :hover) {
  background-color: #e5e7eb;
}

.detail-label {
  font-weight: 600;
  font-style: italic;
}
</style>
