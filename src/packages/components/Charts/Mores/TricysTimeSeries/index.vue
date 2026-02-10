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
import { PropType, computed, watch, ref, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
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

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, [])
})

const fetchData = async () => {
    const { taskId, variables } = props.chartConfig.option.dataset
    if (!taskId || !variables || variables.length === 0) return

    try {
        const response = await axios.post('/data/timeseries/batch', {
            taskId: taskId,
            variables: variables
        })

        if (response) {
          const payload = (response as any).data ?? response
          updateChart(payload as any)
        }
    } catch (error) {
        console.error("Failed to fetch Tricys time series:", error)
        // Clear data to avoid misleading state
        const newOption = { ...props.chartConfig.option }
        if (newOption.series) newOption.series = []
        if (newOption.xAxis) newOption.xAxis.data = []
        Object.assign(props.chartConfig.option, newOption)
    }
}

const updateChart = (data: any) => {
    // Backend returns: { "time": [...], "series": { "var1": [...], ... } }
    
    if (!data || !data.time || !data.series) return

    const times = data.time
    const seriesData = data.series
    const series: any[] = []
    
    props.chartConfig.option.dataset.variables.forEach((variable: string) => {
        if (seriesData[variable]) {
            series.push({
                name: variable,
                type: 'line',
                data: seriesData[variable],
                smooth: true,
                showSymbol: false
            })
        }
    })

    // Create a new option object to trigger reactivity
    const newOption = { ...props.chartConfig.option }
    if (!newOption.xAxis) newOption.xAxis = {}
    newOption.xAxis.data = times
    newOption.series = series
    
    // Assign back
    Object.assign(props.chartConfig.option, newOption)
}

watch(
  () => props.chartConfig.option.dataset,
  () => {
    fetchData()
  },
  { deep: true }
)

onMounted(() => {
    fetchData()
})

</script>
