<template>
  <nav px6 py4 text-lg flex="~ gap-2 items-center">
    <div i-carbon-headphones text-4xl />
    <span text-2xl class="lt-md:hidden">PodwiseAI</span>
    <div flex-auto />
    <ToggleTheme />
    <NuxtLink
      p2 rounded
      href="https://github.com/eeee0717/podwise-ai" target="_blank"
    >
      <div i-carbon-logo-github text-2xl />
    </NuxtLink>
  </nav>
</template>
