<script setup lang="ts">
const result = ref<{ status?: string, result?: string }>({})
const taskId = ref<number>(0)
const { pause, resume } = useTimeoutPoll(() => checkTranscriptPoll(taskId.value, result), 5000)
async function test() {
  taskId.value = 9307720562
  resume()
}

watchEffect(() => {
  if (result.value.status === 'success') {
    console.log('pause')
    pause()
  }
})
</script>

<template>
  <div>
    <h1>This is Test page</h1>
    <UButton @click="test">
      Test
    </UButton>
  </div>
  <div>
    {{ result.result }}
  </div>
</template>
