<template>
  <div :style="getStyle(borderRadius)">
    <iframe :src="src" :width="w" :height="h" allowfullscreen style="border-width: 0"></iframe>
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, ref, computed } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import {debounce} from 'lodash'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { borderRadius } = toRefs(props.chartConfig.option)

// const option = shallowReactive({
//   dataset: ''
// })

let src = ref('')
const setValue = debounce((v: string) => {
  src.value = v
}, 1000)
watch(
  () => props.chartConfig.option.dataset,
  (v: string) => {
    setValue(v)
  },
  {
    immediate: true
  }
)

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

// // 编辑更新
// watch(
//   () => props.chartConfig.option.dataset,
//   (newData: string) => {
//     option.dataset = newData
//   },
//   {
//     immediate: true
//   }
// )

// // 预览更新
// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: string) => {
//   option.dataset = newData
// })
</script>
