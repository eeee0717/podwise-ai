<script setup lang="ts">
const items = ref([
  { label: 'Home', icon: 'i-carbon-home', to: '/' },
  { label: 'Episods', icon: 'i-carbon-media-library', to: '/episods' },
  { label: 'Podcasts', icon: 'i-material-symbols-podcasts-rounded', to: '/podcasts' },
])
</script>

<template>
  <div class=" flex flex-col w-40 lt-md:w-9">
    <div v-for="item, idx in items" :key="idx">
      <NuxtLink
        :to="item.to"
        class="flex items-center justify-center rounded p2 gap-2"
        hover="bg-gray/10"
      >
        <div text-lg :class="item.icon" />
        <span text-lg class="lt-md:hidden">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
