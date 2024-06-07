<script setup lang="ts">
import type { Episode } from '~/types'

const episode = ref<Episode>({})
const route = useRoute()
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
  <div class="relative flex flex-col items-center lg:items-start -m-6 p-6 bg-gradient-to-br from-cyan-800/10 to-violet-800/10 dark:from-cyan-950 dark:to-violet-950 pb-8">
    <div class="flex flex-col items-center gap-y-4 lg:flex-row lg:gap-x-6">
      <img class="bg-white dark:bg-gray-950 object-contain rounded-md w-36 h-36 shadow" :src="episode.picUrl">
      <div class="flex flex-col items-center gap-y-2 lg:items-start">
        <TimeModule :date-published="episode.datePublished" :duration="episode.duration" />
        <h1 class="text-xl font-semibold lg:text-2xl text-center lg:text-start line-clamp-3 lg:line-clamp-2">
          {{ episode.title }}
        </h1>
      </div>
    </div>
  </div>
  <div class="mt-11 lg:mt-14 dont-break-out w-[calc(100vw-3rem)] lg:w-auto">
    <div class="flex justify-center">
      <div class="shownotes-content prose prose-ol:leading-none prose-ul:leading-none dark:prose-invert max-w-full" v-html="episode.shownotes " />
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
