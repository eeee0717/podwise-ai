<script setup lang="ts">
import { usePodcastStore } from '~/store'

const podcastStore = usePodcastStore()
</script>

<template>
  <div class="p2">
    <div v-if="podcastStore.podcast">
      <PodcastCard :podcast="podcastStore.podcast" />
    </div>
  </div>
</template>
