<script setup lang="ts">
import type { Podcast } from '~/types'

const supabase = useSupabaseClient()
const podcastList = ref<Podcast[]>([])
onMounted(async () => {
  const { data, error } = await supabase.from('podcast').select('*')
  if (data) {
    podcastList.value = data
  }
  else {
    console.error('error', error)
  }
})
</script>

<template>
  <div v-if="podcastList" class="p2">
    <div v-for="podcast, idx in podcastList" :key="idx">
      <PodcastCard :podcast="podcast" />
    </div>
  </div>
</template>
