<script setup lang="ts">
import { useEpisodeStore, usePodcastStore } from '~/store'

// const episodeStore = useEpisodeStore()
const podcastStore = usePodcastStore()
</script>

<template>
  <div>
    <ImportInput />
    <div>
      <UButton @click="console.log(podcastStore.podcast)">
        show podcast
      </UButton>
    </div>
    <div>
      {{ podcastStore.podcast?.episodes?.length }}
    </div>
  </div>
</template>
