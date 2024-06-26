<script setup lang="ts">
import type { Episode } from '~/types'

const toast = useToast()
const supabase = useSupabaseClient()
const episode = ref<Episode>({})
const route = useRoute()
const selectedTab = ref('Shownotes')
const isSummarized = ref(false)
const isTranscripted = ref(false)
const taskId = ref<number>(0)
const transcriptContent = ref<{ status?: string, result?: string }>({})
const aiSummaryContent = ref('')
const items = computed(() => [
  { label: 'Shownotes', icon: 'i-carbon-bookmark', disabled: false },
  { label: 'Summary', icon: 'i-carbon-ai-status', disabled: !isSummarized.value },
  { label: 'Mindmap', icon: 'i-carbon-partition-repartition', disabled: !isSummarized.value },
  { label: 'Key Words', icon: 'i-carbon-star-review', disabled: !isSummarized.value },
  { label: 'Transcript', icon: 'i-carbon-ibm-watson-language-translator', disabled: !isTranscripted.value },
])
function tabSelected(index: number) {
  const item = items.value[index]
  selectedTab.value = item.label
}
// task test 9313393197
const { pause, resume } = useTimeoutPoll(() => checkTranscriptPoll(9313393197, transcriptContent), 5000)

async function getTranscript() {
  // const response = await $fetch('/api/getTranscript', {
  //   method: 'POST',
  //   body: JSON.stringify({ mediaUrl: episode.value.mediaUrl }),
  // })
  // if (!response) {
  //   return
  // }
  // console.log(response)
  // taskId.value = response
  resume()
}
async function getAISummary() {
  const transcript = await optimizeTranscript(episode.value.transcript)
  const aiSummaryContent = await $fetch('/api/getAISummary', {
    method: 'POST',
    body: JSON.stringify({ transcript }),
  })
  console.log(aiSummaryContent)
}

watchEffect(async () => {
  if (transcriptContent.value.status === 'success') {
    isTranscripted.value = true
    episode.value.transcript = transcriptContent.value.result
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const { data: responseData, error } = await supabase.from('episods').update({ transcript: episode.value.transcript }).eq('eid', episode.value.eid).select('*')
    if (error) {
      throw new Error(error.message)
    }
    console.log(responseData)
    toast.add({ title: 'Transcript fetched successfully', timeout: 4000 })
    pause()
  }
})

onMounted(async () => {
  const supabase = useSupabaseClient()
  const { data } = await supabase.from('episods').select('*').eq('eid', route.params.eid)
  if (!data) {
    return
  }
  episode.value = data[0]
  if (episode.value.aiSummary) {
    isSummarized.value = true
  }
  if (episode.value.transcript) {
    isTranscripted.value = true
  }
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
        <UButton class="m-t-5" size="xl" icon="i-carbon-data-enrichment" variant="outline" @click="getAISummary">
          AI Summary
        </UButton>
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
          <ShownotesCard v-if="selectedTab === 'Shownotes'" :shownotes="episode.shownotes" />
          <SummaryCard v-if="selectedTab === 'Summary'" :summary="episode.aiSummary" />
          <TranscriptCard v-if="selectedTab === 'Transcript'" :transcript="episode.transcript" />
        </div>
      </div>
    </div>
  </div>
</template>
