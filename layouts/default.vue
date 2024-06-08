<script setup lang="ts">
const links = ref([
  { label: 'Home', icon: 'i-carbon-home', to: '/' },
  { label: 'Episods', icon: 'i-carbon-media-library', to: '/episods' },
  { label: 'Podcasts', icon: 'i-material-symbols-podcasts-rounded', to: '/podcasts' },
])
</script>

<template>
  <div class="w-screen h-screen of-hidden" grid="~ rows-[max-content_1fr]">
    <TheNav />
    <div grid="~ cols-[min-content_1fr] gap-8">
      <UVerticalNavigation
        :links="links" class="justify-center ml-10 mr-5 lt-md:m-l-26px lt-md:w-8 "
      />
      <div class="overflow-scroll h-90vh">
        <slot />
      </div>
    </div>
  </div>
</template>
