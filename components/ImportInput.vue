<script setup lang="ts">
import type { Episode, Podcast } from '~/types'

const importUrl = ref('')
const toast = useToast()
const accessToken = useLocalStorage('accessToken', '')
const deviceId = useLocalStorage('deviceId', '')
const freshToken = useLocalStorage('freshToken', '')
const episode = ref<Episode | null>(null)
const podcast = ref<Podcast | null>(null)
async function Import() {
  if (importUrl.value === '')
    return
  if (importUrl.value.match(xiaoyuzhouPodcastRegex)) {
    await handlePodcast()
  }
  else if (importUrl.value.match(xiaoyuzhouEpisodeRegex)) {
    await handleEpisode()
  }
}

async function handlePodcast() {
  await getAuthToken()
  const data: Podcast = {
    pid: importUrl.value.split('/').pop() ?? '',
    appToken: {
      accessToken: accessToken.value,
      deviceId: deviceId.value,
      freshToken: freshToken.value,
    },
  }
  const response = await $fetch('/api/getPodcast', {
    method: 'POST',
    body: JSON.stringify(data),
  }).catch((err) => {
    toast.add({ title: JSON.stringify(err) })
    return null
  })
  if (response === null)
    return null
  podcast.value = response as Podcast
  console.log(podcast.value)
}

async function handleEpisode() {
  await getAuthToken()
  const data: Episode = {
    eid: importUrl.value.split('/').pop() ?? '',
    appToken: {
      accessToken: accessToken.value,
      deviceId: deviceId.value,
      freshToken: freshToken.value,
    },
  }
  const response = await $fetch('/api/getEpisode', {
    method: 'POST',
    body: JSON.stringify(data),
  }).catch((err) => {
    toast.add({ title: JSON.stringify(err) })
    return null
  })
  if (response === null)
    return null
  episode.value = response as Episode
  console.log(episode.value)
}
</script>

<template>
  <div class="w-full">
    <div flex="~ row" class="gap-2">
      <UInput
        v-model="importUrl"
        class="flex-auto"
        name="q"
        autocomplete="off"
        placeholder="Import episods or podcasts..."
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #leading>
          <UAvatar
            src="/xiaoyuzhou-logo.png"
            size="2xs"
          />
        </template>
        <template #trailing>
          <UButton
            v-show="importUrl !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="importUrl = ''"
          />
        </template>
      </UInput>
      <UButton color="primary" variant="outline" @click="Import">
        <span lt-md:hidden>Import</span>
        <div i-carbon-import-export md:hidden />
      </UButton>
    </div>
  </div>
</template>
