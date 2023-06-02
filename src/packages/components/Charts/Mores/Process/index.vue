<template>
  <n-progress
    :type="type"
    :height="h"
    :processing="processing"
    :percentage="option.dataset"
    :indicator-placement="indicatorPlacement"
    :color="color"
    :rail-color="railColor"
    :offset-degree="offsetDegree"
    :show-indicator="showindicator"
    :border-radius="borderradius"
  >
    <n-text
      :style="{
        color: indicatorTextColor,
        fontSize: `${indicatorTextSize}px`
      }"
    >
      {{ option.dataset }} {{ unit }}
    </n-text>
  </n-progress>
</template>

<script setup lang="ts">
import { PropType, toRefs, watch, shallowReactive } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import config, { option as configOption } from './config'
import { isPreview, isString, isNumber, colorGradientCustomMerge } from '@/utils'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})
// 数据处理
const dataHandle = (newData: number | string) => {

newData = isString(newData) ? parseFloat(newData) : newData
return parseFloat(newData.toFixed(2))
}
// 取配置数据
const { w, h } = toRefs(props.chartConfig.attr)
const {
  type,
  unit,
  color,
  processing,
  railColor,
  indicatorTextColor,
  indicatorPlacement,
  indicatorTextSize,
  offsetDegree,
  dataset,
  showindicator,
  borderradius
} = toRefs(props.chartConfig.option)
const option = shallowReactive({
  dataset: props.chartConfig.option.dataset
})


// 手动更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    try {
      option.dataset = dataHandle(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)
// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: number) => {

  option.dataset =dataHandle(newData)
})
</script>
