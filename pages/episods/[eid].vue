<script setup lang="ts">
import type { Episode } from '~/types'

const episode = ref<Episode>({})
const route = useRoute()
const selectedTab = ref('Shownotes')
const items = ref([
  { label: 'Shownotes', icon: 'i-carbon-bookmark' },
  { label: 'Summary', icon: 'i-carbon-ai-status' },
  { label: 'Mindmap', icon: 'i-carbon-partition-repartition' },
  { label: 'Key Words', icon: 'i-carbon-star-review' },
  { label: 'Transcript', icon: 'i-carbon-ibm-watson-language-translator' },

])
function tabSelected(index: number) {
  const item = items.value[index]
  selectedTab.value = item.label
}
onMounted(async () => {
  const supabase = useSupabaseClient()
  const { data } = await supabase.from('episods').select('*').eq('eid', route.params.eid)
  if (!data) {
    return
  }
  episode.value = data[0]
})
</script>

<template>
  <div>
    <div class="relative flex flex-col items-center gap-y-4  p-6 pb-9 bg-gradient-to-br from-cyan-800/10 to-violet-800/10 dark:from-cyan-950 dark:to-violet-950 lg:flex-row lg:gap-x-6">
      <img class="bg-white dark:bg-gray-950 object-contain rounded-md w-36 h-36 shadow" :src="episode.picUrl">
      <div class="flex flex-col items-center gap-y-2 lg:items-start">
        <TimeModule :date-published="episode.datePublished" :duration="episode.duration" />
        <h1 class="text-xl font-semibold lg:text-2xl text-center lg:text-start line-clamp-3 lg:line-clamp-2">
          {{ episode.title }}
        </h1>
        <div>
          <UButton icon="i-material-symbols-play-circle-outline" variant="outline">
            play
          </UButton>
        </div>
      </div>
    </div>
    <div class="mt-2 dont-break-out w-[calc(100vw-3rem)] w-auto">
      <div grid="~ rows-[min-content_1fr]">
        <UTabs :items="items" class="lg:mx-30 mx-10" @change="tabSelected">
          <template #default="{ item, selected }">
            <div class="flex items-center gap-2 relative truncate">
              <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

              <span class="truncate">{{ item.label }}</span>

              <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
            </div>
          </template>
        </UTabs>
        <div class="flex justify-center">
          <div v-if="selectedTab === 'Shownotes'" class="shownotes-content prose prose-ol:leading-none prose-ul:leading-none dark:prose-invert max-w-full" v-html="episode.shownotes " />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shownotes-content {
  max-width: 55%;
}
.shownotes-content p {
  color:#333333;
  font-weight:normal;
  font-size:16px;
  line-height:20px;
  font-family:Helvetica,Arial,sans-serif;
  hyphens:auto;
  text-align:justify;
}
</style>
