<script setup lang="ts">
function test() {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}
</script>

<template>
  <div>
    <h1>This is Test page</h1>
    <UButton @click="test">
      Test
    </UButton>
  </div>
</template>
