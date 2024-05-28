<template>
  <div class="w-screen h-screen of-hidden" grid="~ rows-[max-content_1fr]">
    <TheNav />
    <div grid="~ cols-[max-content_1fr] gap-8" px6>
      <MenuBar />
      <div class="overflow-scroll h-screen">
        <slot />
      </div>
    </div>
  </div>
</template>
