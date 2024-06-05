<script setup>
import '@unocss/reset/tailwind.css'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications class="w-100" position="top-0 bottom-auto" />
</template>

<style>
.dark {
  color-scheme: dark;
}
html, body {
  height: 100vh;
  overflow: hidden;
}
</style>
