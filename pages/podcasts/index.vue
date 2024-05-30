<script setup lang="ts">
import { usePodcastStore } from '~/store'
import type { Podcast } from '~/types'

const podcastStore = usePodcastStore()
const supabase = useSupabaseClient()
onMounted(async () => {
  const { data, error } = await supabase.from('podcast').select('*')
  console.log(data)
})
</script>

<template>
  <div class="p2">
    <div v-if="podcastStore.podcast">
      <PodcastCard :podcast="podcastStore.podcast" />
    </div>
  </div>
</template>
