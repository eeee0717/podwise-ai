<script setup lang="ts">
import type { Podcast } from '~/types'

const props = defineProps<{
  podcast: Podcast
}>()
</script>

<template>
  <div class="b b-1 border-gray:20 rounded p2 flex items-center justify-center">
    <div grid="~ cols-[1fr_min-content] gap-2" class="w-full">
      <div grid="~ cols-[min-content_1fr] gap-2" class=" flex items-center">
        <div>
          <img class="flex max-w-24 max-h-24" crossorigin="anonymous" :src="props.podcast.picUrl" alt="cover">
        </div>
        <div class="max-w-230" grid="~ rows-3">
          <p text-lg class="flex items-center">
            {{ props.podcast.title }}
          </p>
          <p class="clamped-text flex items-center  text-sm text-gray:80">
            {{ props.podcast.description }}
          </p>
          <p text-sm text-gray:80 class="flex items-center">
            {{ props.podcast.author }}
          </p>
        </div>
      </div>
      <div class="flex items-center">
        <UButton size="lg" variant="ghost" color="white" icon="i-carbon-information">
          play
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .clamped-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* 限制显示的行数 */
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5; /* 根据需要调整行高 */
    max-height: calc(1.5em * 1); /* 行高乘以显示的行数 */
  }
</style>
