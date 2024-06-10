<script setup lang="ts">
const res = ref('')
async function test() {
  const response = await $fetch('/api/getAISummary', {
    method: 'POST',
    body: JSON.stringify({ transcript: 'Say: This is a test' }),
  })
  console.log(response)
  // res.value = await openai.chat('This is a test')
}
</script>

<template>
  <div>
    <h1>This is Test page</h1>
    <UButton @click="test">
      Test
    </UButton>
  </div>
  <div>
    {{ res }}
  </div>
</template>
