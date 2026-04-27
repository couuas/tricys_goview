import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { TricysReadonlyTopologyConfig } from './index'

export const option = {
  dataset: {
    projectId: '',
    taskId: '',
    title: 'TRICYS 3D TOPOLOGY',
    subtitle: 'Read-only topology skeleton',
    nodes: [],
    edges: []
  },
  scene: {
    autoRotate: false,
    showGrid: true,
    accentColor: '#22d3ee',
    backgroundColor: '#071018'
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TricysReadonlyTopologyConfig.key
  public attr = { ...chartInitConfig, w: 640, h: 420, zIndex: 1 }
  public chartConfig = cloneDeep(TricysReadonlyTopologyConfig)
  public option = cloneDeep(option)
}