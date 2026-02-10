<template>
  <div ref="chartRef" class="tricys-3d-model"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, PropType, ref, toRefs, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option } from './config'
import ThreeModel from './ThreeModel'
import throttle from 'lodash/throttle'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const chartEditStore = useChartEditStore()
const chartRef = ref<HTMLElement>()
const { w, h } = toRefs(props.chartConfig.attr)
let threeInstance: ThreeModel | null = null

// Import SystemStore for token
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { getLocalStorage } from '@/utils'

const init = () => {
  if (chartRef.value) {
    threeInstance = new ThreeModel(chartRef.value, w.value, h.value)
    updateData(props.chartConfig.option.dataset)
  }
}

const updateData = (data: any) => {
    let url = ''
    const headers: Record<string, string> = {}

    // Get token
    const systemStore = useSystemStore()
    const userInfo = systemStore.getUserInfo
    const token = userInfo[SystemStoreUserInfoEnum.USER_TOKEN]
    if (token) {
        headers['token'] = token
    }

    if (typeof data === 'string') {
        url = data
    } else if (data?.taskId && data?.path) {
        // Construct Tricys URL
        // Use configured base URL or fallback
        const ctx = getLocalStorage('TRICYS_CTX')
        const apiBase = ctx?.apiBase || (window as any)._GOVIEW_API_BASE_URL || '/api/v2/goview'
        // remove trailing slash
        const baseUrl = apiBase.replace(/\/$/, '')
        
        url = `${baseUrl}/data/files/download?taskId=${data.taskId}&path=${encodeURIComponent(data.path)}`
        
        // Also append token to URL for robustness (if GLTFLoader fails to set header for some reason)
        // But headers are better. Let's rely on headers since we implemented it.
        // Actually, deps.py supports query param too. Let's add it as backup? 
        // No, stay clean. Header is enough.
    } else if (data?.url) {
        url = data.url
    }

    if (url && threeInstance) {
        threeInstance.loadModel(url, headers)
    }
}

// Resize handler
watch(
  () => [w.value, h.value],
  throttle(([newWidth], [newHeight]) => {
    threeInstance?.updateSize(newWidth, newHeight)
  }, 100)
)

// Data handler
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
     updateData(newData)
  },
  { deep: true } // Support object changes
)

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
    threeInstance?.dispose()
})

useChartDataFetch(props.chartConfig, useChartEditStore, updateData)
</script>

<style scoped>
.tricys-3d-model {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
