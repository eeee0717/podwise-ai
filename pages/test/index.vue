<script setup lang="ts">
import { getAuthToken } from '~/utils/getAuthToken'

async function Test() {
  await getAuthToken()
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
