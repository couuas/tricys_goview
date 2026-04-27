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
import { getTricysContext } from '@/utils'
import axios from '@/api/axios'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<any>,
    required: true
  }
})

const metricsData = ref<Record<string, any>>({})

const resolveProjectId = () => String(props.chartConfig.option.dataset.projectId || getTricysContext().projectId || '')

const resolveTaskId = async () => {
    const explicitTaskId = String(props.chartConfig.option.dataset.taskId || '')
    if (explicitTaskId) return explicitTaskId

    const projectId = resolveProjectId()
    if (!projectId) return ''

    const latestTaskResponse = await axios.get('/data/latest-task', {
        params: { projectId }
    })
    const latestPayload = (latestTaskResponse as any)?.data ?? latestTaskResponse
    const latestTask = latestPayload?.data ?? latestPayload ?? null
    return String(latestTask?.id || '')
}

const fetchData = async () => {
    const { metrics } = props.chartConfig.option.dataset
    const taskId = await resolveTaskId()
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
