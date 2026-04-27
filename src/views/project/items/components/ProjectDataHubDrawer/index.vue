<template>
  <n-drawer
    :show="show"
    placement="right"
    :width="width"
    :mask="false"
    :mask-closable="true"
    :trap-focus="false"
    class="tricys-datahub-drawer"
    @update:show="handleDrawerUpdate"
  >
    <n-drawer-content closable>
      <template #header>
        <div class="drawer-header">
          <div>
            <p class="drawer-eyebrow">TRICYS DATA HUB</p>
            <h2>{{ projectName }}</h2>
          </div>
          <span class="drawer-status" :class="statusTone(summary.status)">{{ summary.status || 'NO_TASK' }}</span>
        </div>
      </template>

      <div class="drawer-shell">
        <section class="hub-hero">
          <div>
            <h3>把 GoView 可用的数据、组件和接口收进首页侧边工作台</h3>
            <p>
              这里不再作为独立页面存在。你可以在保留项目页面列表的同时，从右侧抽屉查看项目态势、可直接拖拽的业务组件，以及需要时再展开的数据接口细节。
            </p>
          </div>
          <div class="hero-actions">
            <n-button ghost type="primary" :loading="isLoading" @click="refreshHub">刷新</n-button>
            <n-button ghost @click="setActiveView('data')">数据 / API</n-button>
          </div>
        </section>

        <section class="metric-row">
          <article v-for="item in commandMetrics" :key="item.label" class="metric-card">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
            <small>{{ item.note }}</small>
          </article>
        </section>

        <section class="hub-tabs">
          <button
            v-for="view in hubViews"
            :key="view.key"
            class="hub-tab"
            :class="{ active: activeView === view.key }"
            @click="setActiveView(view.key)"
          >
            <span>{{ view.label }}</span>
            <small>{{ view.note }}</small>
          </button>
        </section>

        <section v-if="activeView === 'overview'" class="view-stack">
          <article class="panel-card emphasis">
            <span class="panel-label">当前建议</span>
            <strong>{{ heroPrompt.title }}</strong>
            <p>{{ heroPrompt.summary }}</p>
          </article>

          <div class="two-column-grid">
            <article class="panel-card">
              <div class="panel-head">
                <h3>关键态势</h3>
              </div>
              <div class="priority-list compact">
                <div v-for="item in priorityPanels" :key="item.title" class="priority-card">
                  <span>{{ item.title }}</span>
                  <strong>{{ item.value }}</strong>
                  <small>{{ item.note }}</small>
                </div>
              </div>
            </article>

            <article class="panel-card">
              <div class="panel-head">
                <h3>开始顺序</h3>
              </div>
              <div class="guide-list">
                <div v-for="step in gettingStartedSteps" :key="step.index" class="guide-item">
                  <span>{{ step.index }}</span>
                  <div>
                    <strong>{{ step.title }}</strong>
                    <small>{{ step.note }}</small>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <article class="panel-card">
            <div class="panel-head">
              <h3>最近任务</h3>
              <n-button text type="primary" @click="copyText(formatJson(tasks.slice(0, 6)), '任务态势 JSON')">复制</n-button>
            </div>
            <div class="task-list">
              <div v-for="task in taskPulse" :key="task.id" class="task-item">
                <div>
                  <strong>{{ task.name }}</strong>
                  <small>{{ task.time }}</small>
                </div>
                <span class="drawer-status" :class="statusTone(task.status)">{{ task.status }}</span>
              </div>
              <div v-if="taskPulse.length === 0" class="empty-inline">当前项目还没有可展示的任务节奏。</div>
            </div>
          </article>
        </section>

        <section v-else-if="activeView === 'components'" class="view-stack">
          <article class="panel-card">
            <div class="panel-head">
              <h3>推荐先放进页面的组件</h3>
              <n-button text type="primary" @click="setActiveView('data')">查看对应数据</n-button>
            </div>

            <div class="component-grid">
              <article v-for="item in featuredComponents" :key="item.title" class="component-card" :class="item.state">
                <div class="component-head">
                  <h4>{{ item.title }}</h4>
                  <span class="state-badge">{{ item.stateLabel }}</span>
                </div>
                <p>{{ item.description }}</p>
                <div class="chip-row">
                  <span v-for="api in item.apis" :key="api" class="chip accent">{{ api }}</span>
                </div>
                <small>{{ item.usage }}</small>
              </article>
            </div>
          </article>

          <div class="two-column-grid">
            <article class="panel-card">
              <span class="panel-label">现成能力</span>
              <strong>{{ readyComponents.length }} 个 READY 组件</strong>
              <p>{{ operationsNote.tertiary }}</p>
            </article>

            <article class="panel-card">
              <span class="panel-label">下一批补齐</span>
              <div class="next-list">
                <div v-for="item in nextComponents" :key="item.title" class="next-item">
                  <strong>{{ item.title }}</strong>
                  <small>{{ item.description }}</small>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section v-else class="view-stack">
          <article class="panel-card">
            <div class="panel-head">
              <h3>实时样本</h3>
              <n-button text type="primary" @click="copyText(formatJson(liveArtifacts), '实时产物 JSON')">复制</n-button>
            </div>
            <div class="metric-row compact-row">
              <article class="metric-card compact">
                <span>最新任务</span>
                <strong>{{ latestTask?.name || 'N/A' }}</strong>
                <small>{{ latestTask?.status || 'No latest task' }}</small>
              </article>
              <article class="metric-card compact">
                <span>文件样本</span>
                <strong>{{ files.length }}</strong>
                <small>{{ files[0]?.name || 'No files loaded' }}</small>
              </article>
              <article class="metric-card compact">
                <span>指标样本</span>
                <strong>{{ metricPairs.length }}</strong>
                <small>{{ metricPairs[0]?.key || 'No metrics loaded' }}</small>
              </article>
            </div>
            <details class="data-details" open>
              <summary>查看聚合样本</summary>
              <pre>{{ formatJson(liveArtifacts) }}</pre>
            </details>
          </article>

          <article class="panel-card">
            <div class="panel-head with-search">
              <h3>语义 API 目录</h3>
              <input v-model.trim="searchText" class="search-input" type="text" placeholder="搜索 API / 参数 / 组件" />
            </div>
            <div class="api-highlight-row">
              <article v-for="item in apiHighlights" :key="item.title" class="api-highlight-card">
                <div class="api-topline">
                  <span class="method-tag" :class="item.method.toLowerCase()">{{ item.method }}</span>
                  <strong>{{ item.title }}</strong>
                </div>
                <p>{{ item.description }}</p>
                <code>{{ item.url }}</code>
              </article>
            </div>

            <div class="api-group-list">
              <details v-for="group in filteredApiGroups" :key="group.title" class="api-group" :open="searchText.length > 0">
                <summary>
                  <div>
                    <strong>{{ group.title }}</strong>
                    <small>{{ group.items.length }} endpoints</small>
                  </div>
                  <span>展开</span>
                </summary>
                <div class="endpoint-list">
                  <article v-for="item in group.items" :key="item.title" class="endpoint-card">
                    <div class="api-topline">
                      <span class="method-tag" :class="item.method.toLowerCase()">{{ item.method }}</span>
                      <strong>{{ item.title }}</strong>
                    </div>
                    <p>{{ item.description }}</p>
                    <code>{{ item.url }}</code>
                    <div class="chip-row relaxed-top">
                      <span v-for="binding in item.bindings" :key="binding" class="chip accent">{{ binding }}</span>
                    </div>
                    <details class="data-details inner">
                      <summary>查看返回结构</summary>
                      <pre>{{ item.response }}</pre>
                    </details>
                  </article>
                </div>
              </details>
            </div>
          </article>
        </section>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import axios from '@/api/axios'
import { StorageEnum } from '@/enums/storageEnum'
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { getLocalStorage, getTricysContext } from '@/utils'

const props = defineProps<{ show: boolean; width: number }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const hubViews = [
  { key: 'overview', label: '概览', note: '先看重点和下一步' },
  { key: 'components', label: '组件', note: '优先复用业务组件' },
  { key: 'data', label: '数据 / API', note: '需要时再展开接口细节' }
]

const activeView = ref('overview')
const isLoading = ref(false)
const searchText = ref('')
const summary = ref<Record<string, any>>({})
const tasks = ref<any[]>([])
const parameters = ref<any[]>([])
const latestTask = ref<Record<string, any> | null>(null)
const analysisTasks = ref<any[]>([])
const metrics = ref<Record<string, any>>({})
const files = ref<any[]>([])
const reportPreview = ref('')
const lastRefreshed = ref('')
const tricysContext = computed(() => getTricysContext())
const projectId = computed(() => String(tricysContext.value.projectId || ''))
const apiBase = computed(() => String(tricysContext.value.apiBase || '').replace(/\/$/, ''))
const compactApiBase = computed(() => apiBase.value.replace(/^https?:\/\//, ''))
const projectName = computed(() => String(summary.value.projectName || projectId.value || 'Unknown Project'))

const unwrapData = (payload: any) => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data
  }
  return payload ?? null
}

const formatJson = (value: unknown) => JSON.stringify(value ?? {}, null, 2)

const formatDateTime = (value: unknown) => {
  if (!value) return ''
  const parsed = new Date(String(value))
  if (Number.isNaN(parsed.getTime())) return String(value)
  return parsed.toLocaleString()
}

const copyText = async (text: unknown, label: string) => {
  try {
    await navigator.clipboard.writeText(String(text || ''))
    window['$message']?.success?.(`${label} 已复制到剪贴板。`)
  } catch (_error) {
    window['$message']?.error?.(`${label} 复制失败。`)
  }
}

const setActiveView = (view: string) => {
  activeView.value = view
}

const handleDrawerUpdate = (value: boolean) => {
  if (!value) emit('close')
}

const statusTone = (status = '') => {
  const value = String(status).toUpperCase()
  if (['RUNNING', 'PENDING'].includes(value)) return 'running'
  if (['COMPLETED', 'SUCCESS'].includes(value)) return 'completed'
  if (['FAILED', 'ERROR', 'CANCELLED'].includes(value)) return 'failed'
  return 'idle'
}

const buildApiUrl = (path: string, query: Record<string, string | number>) => {
  const base = apiBase.value || '/api/v2/goview'
  const url = new URL(`${base}${path}`, window.location.origin)
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })
  return `${url.pathname}${url.search}`
}

const liveArtifacts = computed(() => ({
  latestTask: latestTask.value,
  metrics: metrics.value,
  files: files.value.slice(0, 6),
  reportPreview: reportPreview.value ? `${reportPreview.value.slice(0, 280)}...` : 'No completed analysis report yet.'
}))

const metricPairs = computed(() => Object.entries(metrics.value || {}).map(([key, value]) => ({ key, value })))
const sampleTaskId = computed(() => String(latestTask.value?.id || tasks.value[0]?.id || '<task-id>'))
const sampleAnalysisTaskId = computed(() => String(analysisTasks.value.find((item) => item.status === 'COMPLETED')?.id || analysisTasks.value[0]?.id || '<analysis-task-id>'))

const componentCatalog = [
  {
    title: '项目概览',
    state: 'ready',
    stateLabel: 'READY',
    description: '最适合做项目首页 Hero 卡，默认绑定项目级上下文。',
    apis: ['/data/summary'],
    usage: '推荐作为每个 GoView 页面顶部的上下文锚点。'
  },
  {
    title: '最近任务',
    state: 'ready',
    stateLabel: 'READY',
    description: '展示最近任务状态、创建时间与类型，适合运营看板和任务入口。',
    apis: ['/data/tasks'],
    usage: '推荐与“结果文件”“分析报告”形成任务级操作面板。'
  },
  {
    title: '参数表',
    state: 'ready',
    stateLabel: 'READY',
    description: '把项目参数直接转成可分页的 name/value 表格。',
    apis: ['/data/parameters'],
    usage: '适合做配置核对、模型输入展示和参数搜索面板。'
  },
  {
    title: 'Tricys Metrics',
    state: 'ready',
    stateLabel: 'READY',
    description: '先解析 `/latest-task`，再取 `/metrics`，形成无需手配 taskId 的指标卡。',
    apis: ['/data/latest-task', '/data/metrics'],
    usage: '适合作为项目首页 KPI 区，降低指标接入门槛。'
  },
  {
    title: '时序曲线模板',
    state: 'next',
    stateLabel: 'NEXT',
    description: '下一批应内建批量时序绑定，避免用户自己拼 batch payload。',
    apis: ['/data/timeseries', '/data/timeseries/batch'],
    usage: '建议做成“变量选择 + 任务选择 + 预置图表”一体化拖拽组件。'
  },
  {
    title: '分析报告卡片',
    state: 'next',
    stateLabel: 'NEXT',
    description: '把分析任务列表和 Markdown 报告整合成业务组件。',
    apis: ['/data/analysis/tasks', '/data/analysis/report'],
    usage: '适合让用户低门槛构建分析成果页与发布页。'
  }
]

const readyComponents = computed(() => componentCatalog.filter((item) => item.state === 'ready'))
const nextComponents = computed(() => componentCatalog.filter((item) => item.state === 'next'))
const featuredComponents = computed(() => componentCatalog.slice(0, 4))

const apiGroups = computed(() => {
  const pid = projectId.value || '<project-id>'
  return [
    {
      title: 'Project Context',
      items: [
        {
          title: '项目摘要',
          method: 'GET',
          url: buildApiUrl('/data/summary', { projectId: pid }),
          description: '返回项目名称、最近更新时间和最近任务状态，适合首页概览卡。',
          bindings: ['项目概览'],
          response: formatJson({ projectName: 'Demo Project', lastUpdated: '2026-04-22T08:00:00', status: 'COMPLETED' })
        },
        {
          title: '项目任务列表',
          method: 'GET',
          url: buildApiUrl('/data/tasks', { projectId: pid, limit: 10 }),
          description: '返回项目最近任务列表，用于最近任务、状态时间线、任务选择器。',
          bindings: ['最近任务'],
          response: formatJson([{ id: 'task-1', name: 'Baseline Run', status: 'RUNNING' }])
        },
        {
          title: '项目参数',
          method: 'GET',
          url: buildApiUrl('/data/parameters', { projectId: pid }),
          description: '返回参数数组或从字典转换后的 name/value 列表。',
          bindings: ['参数表'],
          response: formatJson([{ name: 'steam_flow', value: 28.5 }])
        }
      ]
    },
    {
      title: 'Task Runtime Data',
      items: [
        {
          title: '摘要指标',
          method: 'GET',
          url: buildApiUrl('/data/metrics', { taskId: sampleTaskId.value }),
          description: '把任务指标整理成 map，适合 KPI 卡片与数值组件。',
          bindings: ['Tricys Metrics'],
          response: formatJson({ efficiency: 0.94, max_temp: 823.5 })
        },
        {
          title: '结果文件列表',
          method: 'GET',
          url: buildApiUrl('/data/files', { taskId: sampleTaskId.value }),
          description: '列出任务工作区文件，可挂接下载器和结果索引卡。',
          bindings: ['结果文件面板'],
          response: formatJson([{ name: 'result.h5', path: 'outputs/result.h5', size: 102400 }])
        }
      ]
    },
    {
      title: 'Analysis Artifacts',
      items: [
        {
          title: '分析任务列表',
          method: 'GET',
          url: buildApiUrl('/data/analysis/tasks', { projectId: pid }),
          description: '返回分析任务，用于分析报告选择器和模板页面入口。',
          bindings: ['分析报告卡片'],
          response: formatJson([{ id: 'analysis-1', name: 'Sensitivity Analysis', status: 'COMPLETED' }])
        },
        {
          title: '分析报告内容',
          method: 'GET',
          url: buildApiUrl('/data/analysis/report', { taskId: sampleAnalysisTaskId.value }),
          description: '返回 Markdown 报告正文，可渲染成分析摘要和报告卡片。',
          bindings: ['分析报告卡片'],
          response: formatJson({ content: '# Analysis Report\n\nKey findings...' })
        }
      ]
    }
  ]
})

const filteredApiGroups = computed(() => {
  const keyword = searchText.value.toLowerCase()
  if (!keyword) return apiGroups.value
  return apiGroups.value
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => [item.title, item.description, item.url, item.bindings.join(' ')].join(' ').toLowerCase().includes(keyword))
    }))
    .filter((group) => group.items.length > 0)
})

const apiHighlights = computed(() => apiGroups.value.flatMap((group) => group.items).slice(0, 4))
const taskPulse = computed(() => tasks.value.slice(0, 5).map((task) => ({
  id: task.id,
  name: task.name || 'Unnamed Task',
  status: task.status || 'UNKNOWN',
  time: formatDateTime(task.updatedAt || task.createdAt || '')
})))

const operationsNote = computed(() => {
  const runningCount = tasks.value.filter((item) => item.status === 'RUNNING').length
  const completedAnalysisCount = analysisTasks.value.filter((item) => item.status === 'COMPLETED').length
  return {
    primary: runningCount > 0 ? `当前有 ${runningCount} 个运行中任务，建议首页突出最近任务与指标卡。` : '当前没有运行中任务，适合整理发布页布局与默认组件。',
    secondary: completedAnalysisCount > 0 ? `已有 ${completedAnalysisCount} 个已完成分析任务，可以补充分析报告卡片。` : '分析报告链路仍偏弱，建议先完成概览、参数与任务页。',
    tertiary: readyComponents.value.length >= 4 ? '现成业务组件已足够搭建第一页，不必先手写数据源。' : '业务组件仍在扩充，复杂页面可先从 API 目录补接入。'
  }
})

const heroPrompt = computed(() => {
  if (tasks.value.some((item) => item.status === 'RUNNING')) {
    return {
      title: '先围绕运行中任务组织页面',
      summary: '优先确认最近任务、关键指标和结果文件入口，让页面先服务于当前运行态势。'
    }
  }
  if (readyComponents.value.length >= 3) {
    return {
      title: '先用现成业务组件搭起页面骨架',
      summary: '从项目概览、Tricys Metrics、最近任务开始，先形成可发布的首页，再决定是否下钻 API。'
    }
  }
  return {
    title: '先确认数据能力，再补组件模板',
    summary: '当前组件和分析能力还在扩充，适合先从数据样本判断页面是否需要深度定制。'
  }
})

const gettingStartedSteps = computed(() => [
  { index: '01', title: '看概览', note: '先确认项目状态、最近任务和本轮重点。' },
  { index: '02', title: '选组件', note: '优先复用业务组件，而不是直接拼接口。' },
  { index: '03', title: '补数据', note: '只有当默认组件不够时，再展开 API 和 JSON。' }
])

const commandMetrics = computed(() => [
  { label: 'Ready Components', value: readyComponents.value.length, note: '可直接拖拽进编辑器' },
  { label: 'Live APIs', value: apiGroups.value.reduce((count, group) => count + group.items.length, 0), note: '项目级语义接口' },
  { label: 'Task Pulse', value: tasks.value.length, note: '最近任务样本' }
])

const priorityPanels = computed(() => [
  { title: '项目状态', value: summary.value.status || 'NO_TASK', note: summary.value.projectName || '等待项目摘要返回' },
  { title: '最近任务', value: latestTask.value?.name || 'N/A', note: latestTask.value?.status || '暂无最近任务' },
  { title: '参数条目', value: parameters.value.length, note: '可映射参数表组件' },
  { title: '分析任务', value: analysisTasks.value.length, note: '含报告发布潜力' }
])

const fetchScoped = async (path: string, params: Record<string, any>) => {
  const response = await axios.get(path, { params })
  return unwrapData((response as any)?.data ?? response)
}

const resetLiveData = () => {
  summary.value = {}
  tasks.value = []
  parameters.value = []
  latestTask.value = null
  analysisTasks.value = []
  metrics.value = {}
  files.value = []
  reportPreview.value = ''
}

const loadHub = async () => {
  if (!projectId.value) {
    resetLiveData()
    return
  }

  isLoading.value = true
  try {
    const baseResults = await Promise.allSettled([
      fetchScoped('/data/summary', { projectId: projectId.value }),
      fetchScoped('/data/tasks', { projectId: projectId.value, limit: 8 }),
      fetchScoped('/data/parameters', { projectId: projectId.value }),
      fetchScoped('/data/latest-task', { projectId: projectId.value }),
      fetchScoped('/data/analysis/tasks', { projectId: projectId.value })
    ])

    summary.value = baseResults[0].status === 'fulfilled' ? (baseResults[0].value || {}) : {}
    tasks.value = baseResults[1].status === 'fulfilled' ? (baseResults[1].value || []) : []
    parameters.value = baseResults[2].status === 'fulfilled' ? (baseResults[2].value || []) : []
    latestTask.value = baseResults[3].status === 'fulfilled' ? (baseResults[3].value || null) : null
    analysisTasks.value = baseResults[4].status === 'fulfilled' ? (baseResults[4].value || []) : []

    const artifactCalls: Array<Promise<any>> = []
    if (latestTask.value?.id) {
      artifactCalls.push(fetchScoped('/data/metrics', { taskId: latestTask.value.id }))
      artifactCalls.push(fetchScoped('/data/files', { taskId: latestTask.value.id }))
    } else {
      artifactCalls.push(Promise.resolve({}))
      artifactCalls.push(Promise.resolve([]))
    }

    const completedAnalysis = analysisTasks.value.find((item) => item.status === 'COMPLETED')
    if (completedAnalysis?.id) {
      artifactCalls.push(fetchScoped('/data/analysis/report', { taskId: completedAnalysis.id }))
    } else {
      artifactCalls.push(Promise.resolve({ content: '' }))
    }

    const artifactResults = await Promise.allSettled(artifactCalls)
    metrics.value = artifactResults[0].status === 'fulfilled' ? (artifactResults[0].value || {}) : {}
    files.value = artifactResults[1].status === 'fulfilled' ? (artifactResults[1].value || []) : []
    reportPreview.value = artifactResults[2].status === 'fulfilled' ? String(artifactResults[2].value?.content || '') : ''

    lastRefreshed.value = formatDateTime(new Date().toISOString())
  } catch (_error) {
    resetLiveData()
    window['$message']?.error?.('无法加载 GoView Data Hub。')
  } finally {
    isLoading.value = false
  }
}

const refreshHub = async () => {
  await loadHub()
}

watch(
  () => [props.show, projectId.value],
  ([visible]) => {
    if (visible) {
      loadHub()
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.drawer-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  h2 {
    margin: 6px 0 0;
    font-size: 24px;
    color: #f5fbff;
  }
}

.drawer-eyebrow,
.panel-label {
  margin: 0;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #7dd3fc;
}

.drawer-shell {
  display: grid;
  gap: 16px;
  min-height: 100%;
}

.hub-hero,
.metric-card,
.panel-card,
.hub-tab,
.component-card,
.api-highlight-card,
.endpoint-card,
.api-group,
.guide-item,
.next-item,
.priority-card,
.task-item {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 18px;
}

.hub-hero,
.metric-card,
.panel-card,
.component-card,
.api-highlight-card,
.endpoint-card,
.guide-item,
.next-item,
.priority-card,
.task-item {
  padding: 16px;
}

.hub-hero {
  display: grid;
  gap: 14px;
  background: radial-gradient(circle at top right, rgba(0, 210, 255, 0.14), transparent 38%), linear-gradient(180deg, rgba(13, 17, 23, 0.98), rgba(9, 13, 18, 0.94));

  h3 {
    margin: 0;
    color: #f5fbff;
    font-size: 24px;
    line-height: 1.25;
  }

  p {
    margin: 10px 0 0;
    color: #96a2b4;
    line-height: 1.7;
  }
}

.hero-actions,
.metric-row,
.hub-tabs,
.two-column-grid,
.component-grid,
.priority-list,
.api-highlight-row,
.chip-row {
  display: grid;
  gap: 12px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
}

.metric-row {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.compact-row {
  margin-bottom: 12px;
}

.metric-card,
.priority-card {
  span,
  small {
    display: block;
    color: #8b949e;
  }

  span {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  strong {
    display: block;
    margin-top: 8px;
    color: #f4f9fc;
    font-size: 22px;
  }

  small {
    margin-top: 6px;
    line-height: 1.55;
  }
}

.metric-card.compact strong {
  font-size: 18px;
}

.hub-tabs {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.hub-tab {
  padding: 14px 16px;
  text-align: left;
  color: #cbd5e1;
  cursor: pointer;

  span,
  small {
    display: block;
  }

  span {
    font-weight: 700;
  }

  small {
    margin-top: 6px;
    color: #8b949e;
    line-height: 1.5;
  }

  &.active {
    border-color: rgba(0, 210, 255, 0.34);
    background: rgba(0, 210, 255, 0.08);
  }
}

.view-stack {
  display: grid;
  gap: 16px;
}

.panel-card.emphasis {
  background: linear-gradient(180deg, rgba(0, 210, 255, 0.12), rgba(255, 255, 255, 0.025));
}

.panel-card strong,
.guide-item strong,
.component-card h4,
.next-item strong,
.api-highlight-card strong,
.endpoint-card strong,
.task-item strong {
  color: #f4f9fc;
}

.panel-card p,
.component-card p,
.api-highlight-card p,
.endpoint-card p,
.next-item small,
.guide-item small,
.task-item small,
.empty-inline {
  color: #96a2b4;
  line-height: 1.65;
}

.two-column-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.priority-list.compact,
.guide-list,
.task-list,
.next-list,
.api-group-list,
.endpoint-list {
  display: grid;
  gap: 12px;
}

.panel-head,
.component-head,
.api-topline,
.task-item,
.drawer-header,
.panel-head.with-search,
.api-group summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.panel-head h3,
.component-head h4 {
  margin: 0;
}

.guide-item {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 12px;

  span {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 210, 255, 0.1);
    color: #7dd3fc;
    font-weight: 700;
  }
}

.component-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.component-card,
.api-highlight-card,
.endpoint-card {
  display: grid;
  gap: 10px;
}

.state-badge,
.drawer-status,
.method-tag,
.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 12px;
}

.state-badge,
.chip.accent {
  color: #93e8ff;
  border-color: rgba(0, 210, 255, 0.22);
}

.component-card.ready .state-badge,
.drawer-status.completed {
  color: #7cf0a7;
  border-color: rgba(34, 197, 94, 0.28);
  background: rgba(34, 197, 94, 0.14);
}

.component-card.next .state-badge {
  color: #f8d67a;
  border-color: rgba(251, 191, 36, 0.22);
  background: rgba(251, 191, 36, 0.1);
}

.drawer-status.running,
.method-tag.post {
  color: #7cc8ff;
  border-color: rgba(59, 130, 246, 0.24);
  background: rgba(59, 130, 246, 0.14);
}

.drawer-status.failed {
  color: #ff9a9a;
  border-color: rgba(239, 68, 68, 0.24);
  background: rgba(239, 68, 68, 0.14);
}

.drawer-status.idle,
.method-tag.get {
  color: #9fb1c3;
  border-color: rgba(159, 177, 195, 0.2);
  background: rgba(159, 177, 195, 0.12);
}

code,
pre {
  font-family: Consolas, 'Courier New', monospace;
}

code {
  display: block;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(0, 210, 255, 0.08);
  color: #9be9ff;
  word-break: break-all;
}

.data-details {
  margin-top: 12px;

  summary {
    cursor: pointer;
    color: #9be9ff;
  }

  pre {
    margin: 10px 0 0;
    padding: 14px;
    max-height: 260px;
    overflow: auto;
    border-radius: 14px;
    background: #071018;
    border: 1px solid rgba(125, 211, 252, 0.12);
    color: #d5eefb;
    white-space: pre-wrap;
    word-break: break-word;
  }

  &.inner {
    margin-top: 4px;
  }
}

.search-input {
  width: min(280px, 100%);
  min-height: 40px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: #f4f9fc;
}

.api-group {
  padding: 14px 16px;
}

.api-group summary {
  cursor: pointer;
}

.relaxed-top {
  margin-top: 10px;
}

@media (max-width: 1280px) {
  .metric-row,
  .hub-tabs,
  .two-column-grid,
  .component-grid {
    grid-template-columns: 1fr;
  }
}
</style>