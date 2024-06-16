<script setup lang="ts">
const props = defineProps<{
  mindmap?: string
}>()
</script>

<template>
  <div class="w-full h-screen flex justify-center">
    <div v-if="props.mindmap" class="w-60%">
      <Mindmap :mindmap="props.mindmap" />
    </div>
  </div>
</template>
