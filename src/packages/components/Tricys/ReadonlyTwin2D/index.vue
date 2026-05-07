<template>
  <div class="tricys-twin-shell">
    <div class="tricys-twin-canvas" :class="{ 'canvas-mode': shouldBypassScenePointerEvents }">
      <TopologyTwinPanel
        :structure-data="structureData"
        :selected-component-id="selectedComponentId"
        :selected-connection-id="selectedConnectionId"
        :component-groups="componentGroups"
        :multi-selected-ids="multiSelectedIds"
        :expanded-group-id="expandedGroupId"
        :annotations="annotations"
        :get-connection-style="getConnectionStyle"
        :route-mode="routeMode"
        :snap-to-grid="snapToGrid"
        :is-read-only="true"
        @select-component="selectedComponentId = $event"
        @select-connection="selectedConnectionId = $event"
      />
    </div>

    <div class="twin-overlay">
      <div class="eyebrow">2D TWIN</div>
      <div class="title">{{ chartConfig.option.dataset.title }}</div>
      <div class="subtitle">{{ chartConfig.option.dataset.subtitle }}</div>
    </div>

    <div class="twin-meta">
      <span>{{ resolvedProjectId ? `PROJECT ${resolvedProjectId}` : 'SAMPLE PROJECT' }}</span>
      <span>{{ chartConfig.option.interaction.mode.toUpperCase() }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CreateComponentType } from '@/packages/index.d'
import { ChartEnum, PreviewEnum } from '@/enums/pageEnum'
import TopologyTwinPanel from '@tricys-visual/modules/studio/components/TopologyTwinPanel.vue'
import { useModelEditorState } from '@tricys-visual/modules/studio/composables/useModelEditorState.js'
import { resolveSceneProjectId } from '../sceneAssetShared'
import { option } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const route = useRoute()

const resolvedProjectId = computed(() => resolveSceneProjectId(props.chartConfig.option.dataset.projectId))
const isInteractiveRoute = computed(() => {
  return route.name === PreviewEnum.CHART_PREVIEW_NAME || route.name !== ChartEnum.CHART_HOME_NAME
})

const shouldBypassScenePointerEvents = computed(() => {
  return props.chartConfig.option.interaction.mode === 'canvas' && !isInteractiveRoute.value
})
const routeMode = ref('orthogonal')
const snapToGrid = ref(true)
const selectedComponentId = ref<string | null>(null)
const selectedConnectionId = ref<string | null>(null)

const {
  annotations,
  componentGroups,
  expandedGroupId,
  getConnectionStyle,
  multiSelectedIds,
  structureData
} = useModelEditorState({
  projectId: resolvedProjectId,
  isReadOnly: computed(() => true)
})
</script>

<style scoped>
.tricys-twin-shell {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(34, 211, 238, 0.18);
  border-radius: 20px;
  background: radial-gradient(circle at top, rgba(34, 211, 238, 0.08), transparent 42%), #071018;
}

.tricys-twin-canvas {
  width: 100%;
  height: 100%;
}

.tricys-twin-canvas.canvas-mode {
  pointer-events: none;
}

.tricys-twin-canvas :deep(.topology-shell),
.tricys-twin-canvas :deep(.topology-canvas),
.tricys-twin-canvas :deep(.topology-svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.twin-overlay {
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

.twin-meta {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 2;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.twin-meta span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(7, 16, 24, 0.74);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #bfe9ff;
  font-size: 11px;
  letter-spacing: 0.08em;
}

</style>