<script setup lang="ts">
const props = defineProps<{
  summary?: string
}>()
</script>

<template>
  <div class="flex justify-center">
    <div class="max-w-55% prose prose-ol:leading-none prose-ul:leading-none dark:prose-invert whitespace-pre-line">
      {{ props.summary }}
    </div>
  </div>
</template>
