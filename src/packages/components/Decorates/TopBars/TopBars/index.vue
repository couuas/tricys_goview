<template>
  <div :style="getStyle(borderRadius)">
    <n-image
      :object-fit="fit"
      preview-disabled
      :src="imageInfo"
      :fallback-src="requireErrorImg()"
      :width="w"
      lazy
      style="position: absolute;left: 0;width: 100%;height: 100%"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs } from 'vue'
import { requireErrorImg } from '@/utils'
import { CreateComponentType } from '@/packages/index.d'
import { fetchImages } from "@/packages/index";

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

let imageInfo = ref('')
// 获取图片
const fetchImageUrl = async () => {
  imageInfo.value = await fetchImages(props.chartConfig.chartConfig)
}
fetchImageUrl()

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

</script>

<style lang="scss" scoped>
</style>
