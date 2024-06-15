<script setup lang="ts">
const props = defineProps<{
  mindmap?: string
}>()
</script>

<template>
  <div class="  w-full h-screen flex justify-center">
    <div class="w-60% b b-1 b-gray">
      <Mindmap :mindmap="props.mindmap" />
    </div>
  </div>
</template>
