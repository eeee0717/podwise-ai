<script setup lang="ts">
import type { Episode, Podcast } from '~/types'

const importUrl = ref('')
const toast = useToast()
async function Import() {
  let data: Podcast | Episode | null = null

  if (importUrl.value === '')
    return
  const apiUrl = ref('')
  if (importUrl.value.match(xiaoyuzhouPodcastRegex)) {
    apiUrl.value = '/api/getPodcast'
    data = { url: importUrl.value } as Podcast
  }
  else if (importUrl.value.match(xiaoyuzhouEpisodeRegex)) {
    apiUrl.value = '/api/getEpisode'
    data = { url: importUrl.value } as Episode
  }
  else {
    return
  }
  await $fetch(apiUrl.value, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((res) => {
    toast.add({ title: JSON.stringify(res) ?? 'Something error' })
  }).catch((err) => {
    toast.add({ title: JSON.stringify(err) })
  })
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
