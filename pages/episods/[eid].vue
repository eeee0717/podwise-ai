<script setup lang="ts">
import { useEpisodeStore } from '~/store/useEpisodeStore'

const episodeStore = useEpisodeStore()
</script>

<template>
  <div>
    This is the episode page {{ $route.params.eid }}
    <div>
      {{ episodeStore.episode }}
    </div>
  </div>
</template>
