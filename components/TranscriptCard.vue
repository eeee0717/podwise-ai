<script setup lang="ts">
const props = defineProps<{
  transcript?: string
}>()
</script>

<template>
  <div class="flex justify-center">
    <div class="max-w-55% prose prose-ol:leading-none prose-ul:leading-none dark:prose-invert whitespace-pre-line">
      {{ props.transcript }}
    </div>
  </div>
</template>
