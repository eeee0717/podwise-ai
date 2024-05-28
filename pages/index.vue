<script setup lang="ts">
import { useEpisodeStore, usePodcastStore } from '~/store'

const episodeStore = useEpisodeStore()
const podcastStore = usePodcastStore()
</script>

<template>
  <div>
    <ImportInput />
    <div>
      {{ episodeStore.episode?.title }}
    </div>
    <div>
      {{ podcastStore.podcast?.title }}
    </div>
  </div>
</template>
