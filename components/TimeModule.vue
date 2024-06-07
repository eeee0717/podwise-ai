<script setup lang="ts">
const props = defineProps<{
  datePublished?: Date
  duration?: number
}>()

const newDate = computed(() => {
  return props.datePublished?.toString().split('T')[0]
})
const duration_hours = computed(() => {
  return Math.floor(props.duration as number / 3600)
})
const duration_minutes = computed(() => {
  return Math.floor((props.duration as number % 3600) / 60)
})
</script>

<template>
  <div>
    <div class="flex flex-row gap-2 text-gray:80">
      <span>{{ newDate }}</span>
      <div class="flex flex-row items-center">
        <div class="i-carbon-timer" />
        <span>{{ duration_hours }}h</span>
        <span>{{ duration_minutes }}m</span>
      </div>
    </div>
  </div>
</template>
