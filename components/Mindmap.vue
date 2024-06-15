<script setup lang="ts">
import { Transformer } from 'markmap-lib'
import { type IMarkmapJSONOptions, Markmap, deriveOptions } from 'markmap-view'

const props = defineProps<{
  mindmap: string
}>()
const transformer = new Transformer()
const mm = ref()
const value = ref('')
const svgRef = ref()
const markmapOptions: Partial<IMarkmapJSONOptions> = {
  initialExpandLevel: 3,
}
function update() {
  const { root } = transformer.transform(value.value)
  mm.value.setData(root)
  mm.value.fit()
}

watch(() => value.value, () => {
  // 监听输入变化更新思维导图
  update()
})
onMounted(() => {
  // 初始化markmap思维导图
  mm.value = Markmap.create(svgRef.value, deriveOptions(markmapOptions))
  value.value = props.mindmap
  // 更新思维导图渲染
  update()
})
</script>

<template>
  <div class="w-full h-full" grid="~ rows-[min-content_1fr]">
    <div>
      this is button
    </div>
    <svg ref="svgRef" class="w-full h-full dark:text-light" border="~ b-1 b-coolgray" />
  </div>
</template>
