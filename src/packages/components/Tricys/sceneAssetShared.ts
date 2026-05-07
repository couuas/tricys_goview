import { getTricysContext } from '@/utils'

export type TricysSceneNode = {
  id: string
  label?: string
  x: number
  y?: number
  z?: number
  color?: string
  size?: number
}

export type TricysSceneEdge = {
  source: string
  target: string
  color?: string
}

export const tricysInteractionModeOptions = [
  { label: 'Canvas', value: 'canvas' },
  { label: 'Inspect', value: 'inspect' },
  { label: 'Preview', value: 'preview' }
]

export const defaultSceneNodes: TricysSceneNode[] = [
  { id: 'source', label: 'Source', x: -48, y: -12, z: -10, color: '#34d399' },
  { id: 'reactor', label: 'Reactor', x: 0, y: 0, z: 0, color: '#38bdf8', size: 1.2 },
  { id: 'storage', label: 'Storage', x: 56, y: -10, z: -12, color: '#f59e0b' },
  { id: 'analysis', label: 'Analysis', x: 10, y: 36, z: 42, color: '#a78bfa' }
]

export const defaultSceneEdges: TricysSceneEdge[] = [
  { source: 'source', target: 'reactor', color: '#60a5fa' },
  { source: 'reactor', target: 'storage', color: '#60a5fa' },
  { source: 'reactor', target: 'analysis', color: '#22d3ee' }
]

export const resolveSceneProjectId = (projectId?: string) => {
  return String(projectId || getTricysContext().projectId || '')
}

export const buildSceneAssetOption = (defaults?: Partial<any>) => ({
  dataset: {
    projectId: '',
    taskId: '',
    title: 'TRICYS SCENE ASSET',
    subtitle: 'Read-only topology asset',
    nodes: defaultSceneNodes,
    edges: defaultSceneEdges,
    ...(defaults?.dataset || {})
  },
  scene: {
    autoRotate: false,
    showGrid: true,
    accentColor: '#22d3ee',
    backgroundColor: '#071018',
    ...(defaults?.scene || {})
  },
  interaction: {
    mode: 'canvas',
    wheelZoom: true,
    panEnabled: false,
    ...(defaults?.interaction || {})
  }
})