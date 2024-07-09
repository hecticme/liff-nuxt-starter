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
      <h1 class="page-heading">
        <span style="color: #4ade80">LIFF</span>
        +
        <span style="color: #34d399">Nuxt</span>
      </h1>

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

.page-heading {
  margin-inline: auto;
  text-align: center;
  margin-block-start: 2rem;
  font-weight: 600;
  font-size: 4rem;
}

.details {
  list-style: none;
  margin-block-start: 4rem;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
