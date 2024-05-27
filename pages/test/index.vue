<script setup lang="ts">
import type { authToken } from '~/types'

async function Test() {
  await $fetch('/api/getToken', {
    method: 'GET',
  }).then((res) => {
    const data: authToken = JSON.parse(res)
    console.log(data['x-jike-access-token'])
  }).catch((err) => {
    console.log(err)
  })
}
</script>

<template>
  <div>
    <h1>This is Test page</h1>
    <UButton @click="Test">
      Test
    </UButton>
  </div>
</template>
