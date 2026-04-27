<template>
  <div class="tricys-topology-shell">
    <div class="topology-canvas" ref="canvasRef"></div>

    <div class="topology-overlay">
      <div class="eyebrow">READ ONLY</div>
      <div class="title">{{ chartConfig.option.dataset.title }}</div>
      <div class="subtitle">{{ chartConfig.option.dataset.subtitle }}</div>
    </div>

    <div class="topology-meta">
      <span>{{ resolvedProjectId ? `PROJECT ${resolvedProjectId}` : 'SAMPLE TOPOLOGY' }}</span>
      <span>{{ nodeCount }} nodes / {{ edgeCount }} edges</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import throttle from 'lodash/throttle'
import { computed, onBeforeUnmount, onMounted, PropType, ref, toRefs, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { getTricysContext } from '@/utils'
import { option } from './config'
import TopologyScene from './TopologyScene'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const canvasRef = ref<HTMLElement>()
const { w, h } = toRefs(props.chartConfig.attr)
let topologyScene: TopologyScene | null = null

const resolvedProjectId = computed(() => {
  return String(props.chartConfig.option.dataset.projectId || getTricysContext().projectId || '')
})

const nodeCount = computed(() => props.chartConfig.option.dataset.nodes?.length || 4)
const edgeCount = computed(() => props.chartConfig.option.dataset.edges?.length || 3)

const init = () => {
  if (!canvasRef.value) return
  topologyScene = new TopologyScene(canvasRef.value, w.value, h.value)
  topologyScene.update(props.chartConfig.option)
}

watch(
  () => props.chartConfig.option,
  (newOption) => {
    topologyScene?.update(newOption)
  },
  { deep: true }
)

watch(
  () => [w.value, h.value],
  throttle(([newWidth, newHeight]) => {
    topologyScene?.updateSize(newWidth, newHeight)
  }, 100)
)

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  topologyScene?.dispose()
  topologyScene = null
})
</script>

<style scoped>
.tricys-topology-shell {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(34, 211, 238, 0.18);
  border-radius: 20px;
  background: radial-gradient(circle at top, rgba(34, 211, 238, 0.12), transparent 42%), #071018;
}

.topology-canvas {
  width: 100%;
  height: 100%;
}

.topology-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(7, 16, 24, 0.72);
  backdrop-filter: blur(12px);
}

.eyebrow {
  color: #22d3ee;
  font-size: 11px;
  letter-spacing: 0.14em;
}

.title {
  margin-top: 6px;
  color: #f4fbff;
  font-size: 18px;
  font-weight: 700;
}

.subtitle {
  margin-top: 4px;
  color: #8fb7c8;
  font-size: 12px;
}

.topology-meta {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 2;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.topology-meta span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(7, 16, 24, 0.74);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #bfe9ff;
  font-size: 11px;
  letter-spacing: 0.08em;
}
</style>