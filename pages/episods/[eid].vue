<script setup lang="ts">
import { useEpisodeStore } from '~/store/useEpisodeStore'
import type { Episode } from '~/types'

const episodeStore = useEpisodeStore()
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
  <div class="flex justify-center">
    <div class="shownotes-content prose prose-ol:leading-none prose-ul:leading-none dark:prose-invert max-w-full" v-html="episode.shownotes " />
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
