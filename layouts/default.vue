<template>
  <div class="w-screen h-screen of-hidden" grid="~ rows-[max-content_1fr]">
    <TheNav />
    <div grid="~ cols-[min-content_1fr] gap-8">
      <MenuBar />
      <div class="overflow-scroll h-90vh">
        <slot />
      </div>
    </div>
  </div>
</template>
