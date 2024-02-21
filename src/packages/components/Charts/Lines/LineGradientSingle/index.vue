<template>
  <v-chart ref="vChartRef" :init-options="initOptions" :theme="themeColor" :option="option.value" :manual-update="isPreview()" autoresize>
  </v-chart>
</template>

<script setup lang="ts">
import { reactive, watch, PropType } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import config, { includes } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import {chartColors, chartColorsSearch, defaultTheme} from '@/settings/chartThemes/index'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import {useChartCommonData, useChartDataFetch} from '@/hooks'
import {isPreview, colorGradientCustomMerge, setTooltipPosition, alpha} from '@/utils'

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

use([DatasetComponent, CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])
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
        // const themeColor =
        //   colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[newColor] ||
        //   colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[defaultTheme]

        const themeColor = chartColors[newColor].color || chartColors[defaultTheme].color
        props.chartConfig.option.series.forEach((value: any, index: number) => {
          value.areaStyle.color = new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: alpha(themeColor[index % themeColor.length], 0.5)
            },
            {
              offset: 1,
              color: 'rgba(0,0,0, 0)'
            }
          ])
        })
      }
      option.value = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
      props.chartConfig.option = option.value
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true
  }
)

watch(
  () => props.chartConfig.option.dataset,
  () => {
    // const themeColor = colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[defaultTheme]
    // const themeColor = chartColors[defaultTheme].color

    // props.chartConfig.option.series.forEach((value: any, index: number) => {
    //   value.areaStyle.color = new graphic.LinearGradient(0, 0, 0, 1, [
    //     {
    //       offset: 0,
    //       color: alpha(themeColor[index % themeColor.length], 0.5)
    //     },
    //     {
    //       offset: 1,
    //       color: 'rgba(0,0,0, 0)'
    //     }
    //   ])
    // })
    option.value = props.chartConfig.option
    if (vChartRef.value) {
      vChartRef.value.setOption(option.value, !isPreview())
    }
  }
)

watch(
  () => props.chartConfig.option.series,
  () => {
    // option.value = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
    option.value = props.chartConfig.option
    if (vChartRef.value) {
      vChartRef.value.setOption(option.value, {
        replaceMerge: ['series']
      })
    }
  },
  {
    deep: true
  }
)

// const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
const { vChartRef } = useChartCommonData(props.chartConfig, useChartEditStore)

</script>
