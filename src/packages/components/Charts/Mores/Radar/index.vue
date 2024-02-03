<template>
  <v-chart ref="vChartRef" :init-options="initOptions" :theme="themeColor" :option="option" :manual-update="isPreview()" autoresize></v-chart>
</template>

<script setup lang="ts">
import { ref, computed, PropType, watch, toRefs } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import dataJson from './data.json'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { includes, option as myOption  } from './config'
import { mergeTheme, setOption } from '@/packages/public/chart'
import {useChartCommonData, useChartDataFetch} from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import {isPreview, setTooltipPosition} from '@/utils'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

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
    type: Object as PropType<CreateComponentType & { option: typeof myOption }>,
    required: true
  }
})

props.chartConfig.option.tooltip.position = setTooltipPosition(props.chartConfig.attr)

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, RadarChart, GridComponent, TooltipComponent, LegendComponent])

const vChartRef = ref<typeof VChart>()

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

// const dataSetHandle = (dataset: typeof dataJson) => {
//   if (dataset.seriesData) {
//     props.chartConfig.option.series[0].data = dataset.seriesData
//     // @ts-ignore
//     props.chartConfig.option.legend.data = dataset.seriesData.map((i: { name: string }) => i.name)
//   }
//   if (dataset.radarIndicator) {
//     props.chartConfig.option.radar.indicator = dataset.radarIndicator
//   }
//   if (vChartRef.value && isPreview()) {
//     setOption(vChartRef.value, props.chartConfig.option)
//   }
// }

// watch(
//   () => props.chartConfig.option.dataset,
//   newData => {
//     try {
//       dataSetHandle(newData)
//     } catch (error) {
//       console.log(error)
//     }
//   },
//   {
//     deep: false
//   }
// )

type SourceItemType = { [k: string]: any }
watch(() => props.chartConfig.option.dataset, (v) => {
  let { dimensions, source } = v
  source.forEach((_: SourceItemType) => {
    if(!Object.prototype.hasOwnProperty.call(props.chartConfig.option.maxMap, _[dimensions[0]])) {
      props.chartConfig.option.maxMap[_[dimensions[0]]] = {
        max: null,
        min: 0
      }
    }
  })
  props.chartConfig.option.radar.indicator = source.map((_: SourceItemType) => {
    return {
      name: _[dimensions[0]],
      max: props.chartConfig.option.maxMap[_[dimensions[0]]].max,
      min: props.chartConfig.option.maxMap[_[dimensions[0]]].min,
    }
  })
  props.chartConfig.option.series[0].data = dimensions.slice(1).map((k: string) => {
    return {
      name: k,
      value: source.map((_: SourceItemType) => _[k])
    }
  })
  props.chartConfig.option.legend.data = dimensions.slice(1)
}, {
  immediate: true,
  deep: true
})

watch(() => props.chartConfig.option.maxMap, () => {
  let { dimensions, source } = props.chartConfig.option.dataset
  props.chartConfig.option.radar.indicator = source.map((_: SourceItemType) => {
    return {
      name: _[dimensions[0]],
      max: props.chartConfig.option.maxMap[_[dimensions[0]]].max,
      min: props.chartConfig.option.maxMap[_[dimensions[0]]].min,
    }
  })
}, {
  immediate: true,
  deep: true
})

// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: typeof dataJson) => {
//   dataSetHandle(newData)
// })

useChartCommonData(props.chartConfig, useChartEditStore)
</script>
