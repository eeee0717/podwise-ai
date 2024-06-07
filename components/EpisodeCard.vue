<script setup lang="ts">
import { format } from 'date-fns'
import { useEpisodeStore } from '~/store/useEpisodeStore'
import type { Episode } from '~/types'

const props = defineProps<{
  episode: Episode
}>()
const episodeStore = useEpisodeStore()

function play() {
  episodeStore.setEpisode(props.episode)
}
</script>

<template>
  <div class="b b-1 border-gray:20 rounded p2 flex items-center justify-center">
    <div grid="~ cols-[1fr_min-content] gap-2">
      <div grid="~ rows-2">
        <div grid="~ cols-[min-content_1fr] gap-2">
          <div class="w-12 h-12">
            <img crossorigin="anonymous" :src="props.episode.picUrl" alt="cover">
          </div>
          <div grid="~ rows-2">
            <TimeModule :date-published="props.episode.datePublished" :duration="props.episode.duration" />
            <p class="clamped-title">
              {{ props.episode.title }}
            </p>
          </div>
        </div>
        <div class="clamped-description text-gray:40 text-sm ">
          {{ props.episode.description }}
        </div>
      </div>
      <div class="flex items-center">
        <UButton size="lg" variant="ghost" color="white" icon="i-carbon-information" :to="`/episods/${props.episode.eid}`" @click="play">
          play
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .clamped-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 限制显示的行数 */
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5; /* 根据需要调整行高 */
    max-height: calc(1.5em * 2); /* 行高乘以显示的行数 */
  }
  .clamped-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* 限制显示的行数 */
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5; /* 根据需要调整行高 */
    max-height: calc(1.5em * 1); /* 行高乘以显示的行数 */
  }
</style>
