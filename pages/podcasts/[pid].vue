<script setup lang="ts">
import { usePodcastStore } from '~/store'
import type { Episode, Podcast } from '~/types'

const route = useRoute()
const podcastStore = usePodcastStore()
const page = ref(1)
const pageCount = 12
const filter = [
  { label: '最新', value: 'new' },
  { label: '最旧', value: 'old' },
  { label: '最短', value: 'short' },
  { label: '最长', value: 'long' },
]
const filterSelected = ref(filter[0].value)
const pid = route.params.pid as string
onMounted(async () => {
  await podcastStore.fetchPodcast(pid)
  await podcastStore.fetchEpisodeList(pid)
})
const podcast = computed(() => podcastStore.podcasts.get(pid))

const filteredEpisods = computed(() => {
  if (!podcast.value?.episods) {
    return []
  }
  // 克隆 episods，以避免改变原数组
  const sortedEpisods: Episode[] = podcast.value.episods

  // 根据 filterselected 的值进行排序
  if (filterSelected.value === 'old') {
    sortedEpisods.sort((a: Episode, b: Episode) => (a.datePublished && b.datePublished) ? (new Date(a.datePublished).getTime() - new Date(b.datePublished).getTime()) : 0)
  }
  else if (filterSelected.value === 'new') {
    sortedEpisods.sort((a: Episode, b: Episode) => (a.datePublished && b.datePublished) ? (new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()) : 0)
  }
  else if (filterSelected.value === 'short') {
    sortedEpisods.sort((a: Episode, b: Episode) => (a.duration && b.duration) ? (a.duration - b.duration) : 0)
  }
  else if (filterSelected.value === 'long') {
    sortedEpisods.sort((a: Episode, b: Episode) => (a.duration && b.duration) ? (b.duration - a.duration) : 0)
  }
  return sortedEpisods
})
const pageEpisods = computed(() => {
  if (!filteredEpisods.value) {
    return []
  }
  const start = (page.value - 1) * pageCount
  const end = start + pageCount
  return filteredEpisods.value.slice(start, end)
})
async function fetchNew() {
  await getAuthToken()
  await handlePodcast(pid, {} as Ref<Podcast>)
  await podcastStore.fetchPodcast(pid)
  await podcastStore.fetchEpisodeList(pid)
}
</script>

<template>
  <div>
    <div class="relative flex flex-col items-center gap-y-4  p-6 pb-9 bg-gradient-to-br from-cyan-800/10 to-violet-800/10 dark:from-cyan-950 dark:to-violet-950 lg:flex-row lg:gap-x-6">
      <img :src="podcast?.picUrl" crossorigin="anonymous" class="rounded-md w-44 h-44 shadow">
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
    <div v-if="podcast?.episods" class="flex flex-col justify-center gap-2 p-2">
      <div class="flex flex-row justify-center gap-2">
        <UPagination v-model="page" :page-count="pageCount" :total="podcast?.episods.length " />
        <USelect v-model="filterSelected" :options="filter" />
        <UButton variant="outline" @click="fetchNew">
          fetch new
        </UButton>
      </div>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <EpisodeCard v-for="episode in pageEpisods" :key="episode.eid" :episode="episode" />
      </div>
    </div>
  </div>
</template>
