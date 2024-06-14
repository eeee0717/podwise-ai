<script setup lang="ts">
const props = defineProps<{
  mindMap?: string
}>()
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="max-w-55% prose prose-ol:leading-none prose-ul:leading-none dark:prose-invert whitespace-pre-line">
      {{ props.mindMap }}
    </div>
  </div>
</template>
