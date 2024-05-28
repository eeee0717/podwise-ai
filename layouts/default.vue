<template>
  <div class="w-screen h-screen of-hidden overflow-scroll" grid="~ rows-[max-content_1fr]">
    <TheNav />
    <div grid="~ cols-[max-content_1fr] gap-8" px6>
      <MenuBar />
      <slot />
    </div>
  </div>
</template>
