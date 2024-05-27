<script setup lang="ts">
import type { authToken } from '~/types'

const accessToken = useLocalStorage('accessToken', '')
async function Test() {
  const response = await $fetch('/api/getToken', {
    method: 'POST',
    body: {
      accessToken,
    },
  }).catch((err) => {
    console.error(err)
    return null
  })

  if (response) {
  // 确保响应不为空再继续
    const authToken = response as authToken
    accessToken.value = authToken['x-jike-access-token']
    console.log(authToken)
  }
  else {
    console.log('No response received.')
  }
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
