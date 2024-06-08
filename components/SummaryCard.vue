<script setup lang="ts">
const props = defineProps<{
  summary?: string
}>()
</script>

<template>
  <div>
    <div>
      {{ props.summary }}
    </div>
  </div>
</template>
