<template>
  <v-chart :theme="themeColor" :init-options="initOptions" :option="option.value" autoresize></v-chart>
</template>

<script setup lang="ts">
import { PropType, watch, reactive, computed } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import 'echarts-liquidfill/src/liquidFill.js'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent } from 'echarts/components'
import config from './config'
import { isPreview, isString, isNumber, colorGradientCustomMerge } from '@/utils'
import { chartColorsSearch, defaultTheme } from '@/settings/chartThemes/index'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartCommonData } from '@/hooks'
import { resultType } from '@/store/modules/chartEditStore/chartEditStore.d'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([CanvasRenderer, GridComponent])

const chartEditStore = useChartEditStore()

const option = reactive({
  value: {}
})

// 渐变色处理
watch(
  () => chartEditStore.getEditCanvasConfig.chartThemeColor,
  (newColor: keyof typeof chartColorsSearch) => {
    try {
      if (!isPreview()) {
        const themeColor =
          colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[newColor] ||
          colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[defaultTheme]
        // 背景颜色
        props.chartConfig.option.series[0].backgroundStyle.color = themeColor[2]
        // 水球颜色
        props.chartConfig.option.series[0].color[0].colorStops = [
          {
            offset: 0,
            color: themeColor[0]
          },
          {
            offset: 1,
            color: themeColor[1]
          }
        ]
      }
      option.value = props.chartConfig.option
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true
  }
)

// // 数据处理
// const dataHandle = (newData: number | string) => {
//   newData = isString(newData) ? parseFloat(newData) : newData
//   return parseFloat(newData.toFixed(2))
// }
//
// // 编辑
// watch(
//   () => props.chartConfig.option.dataset,
//   newData => {
//     if (!isString(newData) && !isNumber(newData)) return
//     props.chartConfig.option.series[0].data = [dataHandle(newData)]
//     option.value = props.chartConfig.option
//   },
//   {
//     immediate: true,
//     deep: false
//   }
// )

// 数据处理
const dataHandle = (newData: resultType) => {
  const { value, name, unit } = newData
  let config = props.chartConfig.option
  const { showPercent, max } = config.series[0].data[0].config

  if(showPercent) config.series[0].data[0].value = value
  else config.series[0].data[0].value = (max && value) ? (value / max).toFixed(2) : 0
  config.series[0].data[0].showValue = value
  config.series[0].data[0].name = name
  config.series[0].data[0].unit = unit
}

const targetData = computed(() => {
  const commonData = props.chartConfig.commonData
  return commonData[commonData.currentSource] as { result: resultType }
})

// 配置时
watch(
  () => targetData.value,
  newData => {
    try {
      dataHandle(newData.result)
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true,
    deep: true
  }
)



watch(() => props.chartConfig.option.series[0].data[0].config, () => {
  const commonData = props.chartConfig.commonData
  const data = commonData[commonData.currentSource] as { result: resultType }
  dataHandle(data.result)
}, {
  immediate: true,
  deep: true,
})

// 预览
// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: number) => {
//   // @ts-ignore
//   option.value.series[0].data = [dataHandle(newData)]
// })
const { vChartRef } = useChartCommonData(props.chartConfig, useChartEditStore)
</script>
