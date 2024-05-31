<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    {{ route.params.pid }}
  </div>
</template>
