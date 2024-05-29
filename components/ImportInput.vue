<script setup lang="ts">
import { useEpisodeStore, usePodcastStore } from '~/store'
import type { Episode, Podcast } from '~/types'

const importUrl = ref('')
const toast = useToast()
const accessToken = useLocalStorage('accessToken', '')
const deviceId = useLocalStorage('deviceId', '')
const freshToken = useLocalStorage('freshToken', '')
const episodeStore = useEpisodeStore()
const podcastStore = usePodcastStore()
async function Import() {
  if (importUrl.value === '')
    return
  // 获取 token
  await getAuthToken()
  if (importUrl.value.match(xiaoyuzhouPodcastRegex)) {
    await handlePodcast()
    await handleEpisodeList()
  }
  else if (importUrl.value.match(xiaoyuzhouEpisodeRegex)) {
    await handleEpisode()
  }
}

function getAppToken() {
  return {
    accessToken: accessToken.value,
    deviceId: deviceId.value,
    freshToken: freshToken.value,
  }
}

async function handlePodcast() {
  const data: Podcast = {
    pid: importUrl.value.split('/').pop() ?? '',
    appToken: getAppToken(),
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
  podcastStore.setPodcastInfo(response as Podcast)
  // console.log(podcastStore.podcast)
}

async function handleEpisodeList() {
  const data: Podcast = {
    pid: importUrl.value.split('/').pop() ?? '',
    appToken: getAppToken(),
  }
  const response = await $fetch('/api/getEpisodeList', {
    method: 'POST',
    body: JSON.stringify(data),
  }).catch((err) => {
    toast.add({ title: JSON.stringify(err) })
    return null
  })
  if (response === null)
    return null

  podcastStore.setPodcastDetails(response as Podcast)
  console.log(podcastStore.podcast)
}

async function handleEpisode() {
  const data: Episode = {
    eid: importUrl.value.split('/').pop() ?? '',
    appToken: getAppToken(),
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
  episodeStore.setEpisode(response as Episode)
  // console.log(episode.value)
}
</script>

<template>
  <div>
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
