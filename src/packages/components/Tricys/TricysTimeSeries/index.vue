<template>
  <v-chart
    ref="vChartRef"
    :init-options="initOptions"
    :theme="themeColor"
    :option="option"
    autoresize
  >
  </v-chart>
</template>

<script setup lang="ts">
import { PropType, computed, watch, ref, onMounted, onUnmounted } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, DatasetComponent } from 'echarts/components'
import { option as defaultOption } from './config'
import { mergeTheme } from '@/packages/public/chart'
import axios from '@/api/axios'

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
    type: Object as PropType<any>,
    required: true
  }
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent, DatasetComponent])

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, [])
})

const fetchData = async () => {
    const { taskId, variables } = props.chartConfig.option.dataset
    if (!taskId || !variables || variables.length === 0) return

    try {
        const response = await axios.post(`/data/${taskId}/timeseries`, {
            variables: variables,
            limit: 500
        })

        if (response) {
          const payload = (response as any).data ?? response
          updateChart(payload as any)
        }
    } catch (error) {
        console.error("Failed to fetch Tricys time series:", error)
        if (props.chartConfig.option.dataset) {
            props.chartConfig.option.dataset.source = []
        }
        props.chartConfig.option.series = []
    }
}

const updateChart = (data: any) => {
    if (!data || !data.dimensions || !data.source) return

    const newDataset = {
        ...props.chartConfig.option.dataset,
        dimensions: data.dimensions,
        source: data.source
    }
    
    const newSeries: any[] = []
    const variableCount = data.dimensions.length - 1
    for (let i = 0; i < variableCount; i++) {
        newSeries.push({
            type: 'line',
            smooth: true,
            showSymbol: false
        })
    }
    
    const newXAxis = {
        ...props.chartConfig.option.xAxis,
        type: 'category'
    }
    delete newXAxis.data

    props.chartConfig.option.dataset = newDataset
    props.chartConfig.option.series = newSeries
    props.chartConfig.option.xAxis = newXAxis
}

watch(
  [
    () => props.chartConfig.option.dataset.taskId, 
    () => props.chartConfig.option.dataset.variables?.join(',')
  ],
  () => {
    fetchData()
  }
)

let timer: any = null

onMounted(() => {
    fetchData()
    timer = setInterval(() => {
        fetchData()
    }, 30000)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})

</script>
