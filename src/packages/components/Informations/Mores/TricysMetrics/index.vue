<template>
  <div class="tricys-metrics">
      <div v-for="(value, key) in metricsData" :key="key" class="metric-item" :style="{ marginBottom: chartConfig.option.style.itemGap + 'px' }">
          <div class="metric-label" :style="{ color: chartConfig.option.style.color, fontSize: (chartConfig.option.style.fontSize * 0.6) + 'px' }">{{ key }}</div>
          <div class="metric-value" :style="{ color: chartConfig.option.style.color, fontSize: chartConfig.option.style.fontSize + 'px' }">{{ value }}</div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch, onMounted } from 'vue'
import { option as defaultOption } from './config'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { getLocalStorage } from '@/utils'
import axios from '@/api/axios' // Use configured axios instance

const props = defineProps({
  chartConfig: {
    type: Object as PropType<any>,
    required: true
  }
})

const metricsData = ref<Record<string, any>>({})

const fetchData = async () => {
    // Dataset should contain taskId
    const { taskId, metrics } = props.chartConfig.option.dataset
    if (!taskId) return

    try {
        // Use the configured axios instance which handles baseURL and token
        const response = await axios.get('/data/metrics', {
            params: { taskId }
        })
        
        if (response) {
            const payload = (response as any).data ?? response
            const data = payload as any
            const result = {} as Record<string, any>
            
            const targetMetrics = metrics && metrics.length > 0 ? metrics : Object.keys(data)
            
            targetMetrics.forEach((key: string) => {
                if (data[key] !== undefined) {
                    result[key] = data[key]
                }
            })
            metricsData.value = result
        }
    } catch (error) {
        console.error("Failed to fetch Tricys metrics:", error)
        metricsData.value = { "Error": "Failed to load" }
    }
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

<style scoped>
.tricys-metrics {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
}
.metric-item {
    text-align: center;
}
.metric-label {
    opacity: 0.8;
}
.metric-value {
    font-weight: bold;
}
</style>
