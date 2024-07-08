<script setup lang="ts">
useHead({
  title: 'LIFF + Nuxt',
  meta: [
    {
      name: 'description',
      content: 'A LIFF web app built with Nuxt.',
    },
  ],
})
</script>

<template>
  <div id="app">
    <ul class="details">
      <li class="detail">
        Information 01
      </li>
    </ul>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
