<script setup lang="ts">
import type { Episode, Podcast } from '~/types'

const supabase = useSupabaseClient()
const route = useRoute()
const podcast = ref<Podcast | null>(null)
const episods = ref<Episode[] | null>(null)
onMounted(async () => {
  const { data: podcastData } = await supabase.from('podcast').select('*').eq('pid', route.params.pid)
  if (podcastData === null) {
    return
  }
  podcast.value = podcastData[0]
  const { data: episodsData } = await supabase.from('episods').select('*').eq('pid', route.params.pid)
  episods.value = episodsData
})
</script>

<template>
  <div>
    <div class="relative flex flex-col items-center gap-y-4  p-6 pb-9 bg-gradient-to-br from-cyan-800/10 to-violet-800/10 dark:from-cyan-950 dark:to-violet-950 lg:flex-row lg:gap-x-6">
      <img :src="podcast?.picUrl" class="rounded-md w-44 h-44 shadow">
      <div class="flex flex-col items-center gap-y-2 lg:items-start">
        <h1 class="text-lg font-semibold line-clamp-2 sm:text-xl lg:text-2xl">
          {{ podcast?.title }}
        </h1>
        <h2 class="flex items-center gap-x-2 text-gray:80 text-center lg:text-start">
          <span>{{ podcast?.author }}</span>
        </h2>
        <p class="text-color-secondary line-clamp-3 lg:line-clamp-2 text-gray:80 ">
          {{ podcast?.description }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 p-6 lg:grid-cols-2">
      <EpisodeCard v-for="episode in episods" :key="episode.eid" :episode="episode" />
    </div>
  </div>
</template>
