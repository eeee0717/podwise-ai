<script setup lang="ts">
const props = defineProps<{
  shownotes?: string
}>()
</script>

<template>
  <div class="shownotes-content prose prose-ol:leading-none prose-ul:leading-none dark:prose-invert max-w-full" v-html="props.shownotes " />
</template>

<style scoped>
.shownotes-content {
  max-width: 55%;
}
.shownotes-content p {
  color:#333333;
  font-weight:normal;
  font-size:16px;
  line-height:20px;
  font-family:Helvetica,Arial,sans-serif;
  hyphens:auto;
  text-align:justify;
}
</style>
