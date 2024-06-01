<script setup lang="ts">
import { useEpisodeStore, usePodcastStore } from '~/store'
import type { Episode, Podcast } from '~/types'

const importUrl = useLocalStorage('importUrl', '')
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
  const data = {
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
  await addPodcastToPg(response as Podcast)
}

async function addPodcastToPg(podcast: Podcast) {
  const { data, msg } = await $fetch('/api/addPodcast', {
    method: 'POST',
    body: JSON.stringify({
      pid: podcast.pid,
      title: podcast.title,
      author: podcast.author,
      description: podcast.description,
      picUrl: podcast.picUrl,
    }),
  })
}

async function handleEpisodeList() {
  const data = {
    podcast: podcastStore.podcast,
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
  await addEpisodsToPg(response as Podcast)
}

async function addEpisodsToPg(podcast: Podcast) {
  const { data, msg } = await $fetch('/api/addEpisods', {
    method: 'POST',
    body: JSON.stringify({
      pid: podcast.pid,
      episods: podcast.episods,
    }),
  })
  console.log(data, msg)
}

async function handleEpisode() {
  const data = {
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
