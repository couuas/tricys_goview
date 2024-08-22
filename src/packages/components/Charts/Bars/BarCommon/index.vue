<template>
  <v-chart 
  ref="vChartRef" 
  :init-options="initOptions" 
  :theme="themeColor" 
  :option="option" 
  :manual-update="isPreview()"
  :update-options="{replaceMerge: replaceMergeArr}" 
  autoresize 
  >
  </v-chart>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch, PropType,onMounted } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import config, { includes, seriesItem } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartDataFetch, useChartCommonData } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import {isPreview, setTooltipPosition} from '@/utils'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import isObject from 'lodash/isObject'
import cloneDeep from 'lodash/cloneDeep'
import {useGlobalQueryParamsStore} from '@/store/modules/globalQueryParamsStore/globalQueryParamsStore'
const chartEditStore = useChartEditStore()

const globalQueryParamsStore = useGlobalQueryParamsStore()
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

use([DatasetComponent, CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent])

const replaceMergeArr = ref<string[]>()

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})
// 控制所有柱状图的点击事件
const chartPEvents = (e:any)=>{
  console.log(e,'e_chartPEvents'),
console.log(props.chartConfig,'chartConfig1')
switch (props.chartConfig.commonData.currentSource) {
  case "areaDevCount":
  globalQueryParamsStore.setGlobalQueryParams({
    space_complete_id : e.data.complete_id
  })
  console.log(chartEditStore.getComponentList,'chartEditStore')
  // 没有统一更新数据的方法，只能尝试改变它的更新时间，促使watch触发请求方法
  chartEditStore.getComponentList.forEach(component=>{
    component.request.requestInterval = 15
    useChartCommonData(component, useChartEditStore)

  })
 
console.log(globalQueryParamsStore.getGlobalQueryParams,'chartConfig2')
  
    break;

  default:
    break;
}
}
onMounted(() => {
  if(vChartRef.value) {
    vChartRef.value.chart.on('click', chartPEvents)
  }
})

// dataset 无法变更条数的补丁
// watch(
//   () => props.chartConfig.option.dataset,
//   (newData: { dimensions: any }, oldData) => {
//     try {
//       if (!isObject(newData) || !('dimensions' in newData)) return
//       if (Array.isArray(newData?.dimensions)) {
//         const seriesArr = []
//         // 对oldData进行判断，防止传入错误数据之后对旧维度判断产生干扰
//         // 此处计算的是dimensions的Y轴维度，若是dimensions.length为0或1，则默认为1，排除X轴维度干扰
//         const oldDimensions = Array.isArray(oldData?.dimensions)&&oldData.dimensions.length >= 1 ? oldData.dimensions.length : 1;
//         const newDimensions = newData.dimensions.length >= 1 ? newData.dimensions.length : 1;
//         const dimensionsGap = newDimensions - oldDimensions;
//         if (dimensionsGap < 0) {
//           props.chartConfig.option.series.splice(newDimensions - 1)
//         } else if (dimensionsGap > 0) {
//           if(!oldData || !oldData?.dimensions || !Array.isArray(oldData?.dimensions) || !oldData?.dimensions.length ) {
//               props.chartConfig.option.series=[]
//           }
//           for (let i = 0; i < dimensionsGap; i++) {
//             seriesArr.push(cloneDeep(seriesItem))
//           }
//           props.chartConfig.option.series.push(...seriesArr)
//         }
//         replaceMergeArr.value = ['series']
//         nextTick(() => {
//           replaceMergeArr.value = []
//         })
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   },
//   {
//     deep: false
//   }
// )

// const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
const { vChartRef } = useChartCommonData(props.chartConfig, useChartEditStore)
</script>
