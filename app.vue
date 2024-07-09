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
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap',
    },
  ],
})

const { $liffInit } = useNuxtApp()

const liffAppInformation = reactive({
  version: '',
  os: '',
})

const userProfile = reactive<{
  idToken: string
  profile: Record<string, null> | null
}>({
  idToken: '',
  profile: null,
})

onMounted(() => {
  $liffInit
    .then(async () => {
      Object.assign(liffAppInformation, {
        version: liff.getVersion(),
        os: liff.getOS(),
      })

      Object.assign(userProfile, {
        idToken: liff.getIDToken(),
        profile: await liff.getProfile(),
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

      <div class="profile-container">
        <h3 class="profile-heading">User Profile</h3>

        <p class="profile-id">
          userIdToken: {{ userProfile.idToken || '...?' }}
        </p>

        <ul v-if="userProfile.profile" class="profile-details">
          <li
          v-for="(value, property, index) in userProfile.profile"
          :key="index"
          >
            {{ `${property}: ${value}` }}
          </li>
        </ul>
      </div>
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
  font-family: 'Space Grotesk', monospace;
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
