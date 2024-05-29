<script setup lang="ts">
import type { Episode } from '~/types'

const props = defineProps<{
  episode: Episode
}>()
</script>

<template>
  <div>
    <div grid="~ cols-[1fr_min-content] gap-2">
      <div grid="~ rows-2 gap-2">
        <div grid="~ cols-[min-content_1fr] gap-2">
          <div class="w-12 h-12">
            <img crossorigin="anonymous" :src="props.episode.picUrl" alt="cover">
          </div>
          <div grid="~ rows-2">
            <div class="flex flex-row">
              <span>{{ episode.datePublished }}</span>
              <div class="flex flex-row items-center">
                <div class="i-carbon-timer" />
                <span>{{ episode.duration }}</span>
              </div>
            </div>
            <p>
              {{ episode.title }}
            </p>
          </div>
        </div>
        <div class="clamped-text text-coolgray">
          {{ props.episode.description }}
        </div>
      </div>
      <div>
        <UButton>
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
    -webkit-line-clamp: 2; /* 限制显示的行数 */
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5; /* 根据需要调整行高 */
    max-height: calc(1.5em * 2); /* 行高乘以显示的行数 */
  }
</style>
