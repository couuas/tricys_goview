<template>
  <div :style="getStyle(borderRadius)">
    <n-image
      :object-fit="fit"
      preview-disabled
      :src="`/src/assets/images/chart/customponents/${dataset}`"
      :fallback-src="requireErrorImg()"
      :width="w"
      lazy
      style="position: absolute;left: 0;width: 100%;height: 100%"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { requireErrorImg } from '@/utils'
import { CreateComponentType } from '@/packages/index.d'
// import background from '@/assets/customComponents/theme1/backgrond.jpg'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

</script>

<style lang="scss" scoped>
</style>
