<template>
  <v-chart ref="vchart" :theme="themeColor" :init-options="initOptions" :option="option.value" autoresize> </v-chart>
</template>

<script setup lang="ts">
import { PropType, reactive, watch } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { mergeTheme } from '@/packages/public/chart'
import config, { includes } from './config'
import { useChartCommonData, useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import { resultType } from '@/store/modules/chartEditStore/chartEditStore.d'
import {setTooltipPosition} from "@/utils";


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

props.chartConfig.option.tooltip.position = setTooltipPosition(props.chartConfig.attr)

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = reactive({
  value: {}
})

// const dataHandle = (newData: any) => {
//   const d = parseFloat(`${newData}`) * 100
//   let config = props.chartConfig.option
//   config.title.text = `${+d.toFixed(2)}%`
//   config.series[0].data[0].value[0] = d
//   config.series[0].data[1].value[0] = 100 - d
//   option.value = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
//   option.value = props.chartConfig.option
// }

// // 配置时
// watch(
//   () => props.chartConfig.option.dataset,
//   newData => {
//     try {
//       dataHandle(newData)
//     } catch (error) {
//       console.log(error)
//     }
//   },
//   {
//     immediate: true,
//     deep: false
//   }
// )

const dataHandle = (newData: any) => {
  const { name, unit, value } = newData
  let config = props.chartConfig.option
  const { showPercent, showUnit, showSubText, showSubTextUnit, max } = config.titleContrl
  config.title.subtext = showSubText ? name: ''
  config.title.subtext += showSubTextUnit && unit ? showSubText ? '(a)'.replace('a', unit) : unit : ''
  if(showPercent) {
    config.title.text = `${value * 100}%`
    config.series[0].data[0].value[0] = value <= 1 ? value * 100 : 100
    config.series[0].data[1].value[0] = value <= 1 ? (1 - value) * 100 : 0
  }
  else {
    config.title.text = `${value}${showUnit ? '(a)'.replace('a', unit) : ''}`
    config.series[0].data[0].value[0] = value
    config.series[0].data[1].value[0] = max - value
  }
  option.value = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
  option.value = props.chartConfig.option
}

const computeTop = (h: number, fs1: number, fs2: number) => {
  let str: string
  if(h) {
    str = (50 - (fs1 + fs2) * 100 / (2 * h)).toFixed(2) + '%'
  }
  else str = 'middle'
  return str
}

watch(
  [
    () => props.chartConfig.attr.h,
    () => props.chartConfig.option.title.textStyle.fontSize,
    () => props.chartConfig.option.title.subtextStyle.fontSize,
    () => props.chartConfig.option.titleContrl.showSubText,
    () => props.chartConfig.option.titleContrl.showSubTextUnit,
  ],
  ([h, fs1, fs2, s1, s2]) => {
    props.chartConfig.option.title.top = computeTop(h, fs1, s1 || s2 ? fs2 : 0)
  },
  {
    immediate: true,
    deep: true,
})

// 配置时
watch(
  () => props.chartConfig.commonData,
  newData => {
    try {
      const data = newData[newData.currentSource] as Object & { result: resultType }
      dataHandle(data.result)
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true,
    deep: true
  }
)
watch(() => props.chartConfig.option.titleContrl, (v) => {
  const commonData = props.chartConfig.commonData
  const data = commonData[commonData.currentSource] as Object & { result: resultType }
  dataHandle(data.result)
}, {
  immediate: true,
  deep: true,
})

// // 预览时
// useChartDataFetch(props.chartConfig, useChartEditStore, (resData: number) => {
//   let d = parseFloat(`${resData}`) * 100
//   // @ts-ignore
//   option.value.title.text = `${+d.toFixed(2)}%`
//   // @ts-ignore
//   option.value.series[0].data[0].value[0] = d
//   // @ts-ignore
//   option.value.series[0].data[1].value[0] = 100 - d
// })

const { vChartRef } = useChartCommonData(props.chartConfig, useChartEditStore)
</script>
