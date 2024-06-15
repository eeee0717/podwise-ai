<script setup lang="ts">
const props = defineProps<{
  mindMap: string
}>()
</script>

<template>
  <div class="  w-full h-screen flex justify-center">
    <div class="w-70%">
      <Mindmap :mindmap="props.mindMap" />
    </div>
  </div>
</template>
