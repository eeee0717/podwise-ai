<script setup lang="ts">
const props = defineProps<{
  links?: Array<{
    label: string
    icon?: string
    to: string
  }>

}>()
</script>

<template>
  <div>
    <NuxtLink
      v-for="link, idx in props.links" :key="idx" :to="link.to"
      class="flex items-center gap-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
      active-class="bg-gray-200 dark:bg-gray-800"
    >
      <i :class="link.icon" class="text-xl" />
      <span>{{ link.label }}</span>
    </nuxtlink>
  </div>
</template>
