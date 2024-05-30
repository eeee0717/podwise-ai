<script setup lang="ts">
import type { Podcast } from '~/types'

const props = defineProps<{
  podcast: Podcast
}>()
</script>

<template>
  <div class="b b-1 border-gray:20 rounded p2 flex items-center justify-center">
    <div grid="~ cols-[1fr_min-content] gap-2" class="w-full">
      <div grid="~ cols-[min-content_1fr] gap-2">
        <div class="w-24 h-24">
          <img crossorigin="anonymous" :src="props.podcast.picUrl" alt="cover">
        </div>
        <div grid="~ rows-3">
          <p text-lg class="flex items-center">
            {{ props.podcast.title }}
          </p>
          <p text-sm text-gray:80 class="flex items-center">
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
