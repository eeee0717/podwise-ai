<script setup lang="ts">
import { usePodcastStore } from '~/store'
import type { Podcast } from '~/types'

const supabase = useSupabaseClient()
const podcastStore = usePodcastStore()
onMounted(async () => {
  const { data } = await supabase.from('podcast').select('pid')
  if (!data)
    return
  for (const item of data) {
    await podcastStore.fetchPodcast(item.pid)
  }
})
</script>

<template>
  <div v-if="podcastStore.podcasts" class="p2">
    <div v-for="podcast, idx in podcastStore.podcasts" :key="idx">
      <PodcastCard :podcast="podcast[1]" />
    </div>
  </div>
</template>
