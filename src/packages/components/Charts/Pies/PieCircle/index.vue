<template>
  <v-chart ref="vChartRef" :theme="themeColor" :option="option" :manual-update="isPreview()" autoresize></v-chart>
</template>

<script setup lang="ts">
import { computed, PropType, watch } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { mergeTheme } from '@/packages/public/chart'
import config, { includes } from './config'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from 'echarts/components'

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

use([
  DatasetComponent,
  CanvasRenderer,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

watch(
    () => props.chartConfig.option.dataset,
    (newData) => {
      props.chartConfig.option.title.text = newData + "%"
      props.chartConfig.option.series[0].data[0].value = newData
      props.chartConfig.option.series[0].data[1].value = 100 - newData
    }
)

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
</script>
