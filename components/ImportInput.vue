<script setup lang="ts">
const importUrl = useLocalStorage('importUrl', '')
async function Import() {
  if (importUrl.value === '')
    return
  // 获取 token
  await getAuthToken()
  if (importUrl.value.match(xiaoyuzhouPodcastRegex)) {
    await handlePodcast(importUrl.value.split('/').pop() ?? '')
  }
  else if (importUrl.value.match(xiaoyuzhouEpisodeRegex)) {
    await handleEpisode(importUrl.value.split('/').pop() ?? '')
  }
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
