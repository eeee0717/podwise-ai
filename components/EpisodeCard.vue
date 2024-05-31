<script setup lang="ts">
import { format } from 'date-fns'
import type { Episode } from '~/types'

const props = defineProps<{
  episode: Episode
}>()

const newDate: string = format(props.episode.datePublished as Date, 'yyyy-MM-dd')
const duration_hours = Math.floor(props.episode.duration as number / 3600)
const duration_minutes = Math.floor((props.episode.duration as number % 3600) / 60)
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
            <div class="flex flex-row gap-2 text-gray:80">
              <span>{{ newDate }}</span>
              <div class="flex flex-row items-center">
                <div class="i-carbon-timer" />
                <span>{{ duration_hours }}h</span>
                <span>{{ duration_minutes }}m</span>
              </div>
            </div>
            <p>
              {{ props.episode.title }}
            </p>
          </div>
        </div>
        <div class="clamped-text text-gray:40 text-sm ">
          {{ props.episode.description }}
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
    -webkit-line-clamp: 2; /* 限制显示的行数 */
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5; /* 根据需要调整行高 */
    max-height: calc(1.5em * 2); /* 行高乘以显示的行数 */
  }
</style>
