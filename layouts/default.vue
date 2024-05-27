<template>
  <div class="w-screen h-screen of-hidden" grid="~ rows-[max-content_1fr]">
    <TheNav />
    <div grid="~ cols-[max-content_1fr]" px6>
      <MenuBar />
      <slot />
    </div>
  </div>
</template>
