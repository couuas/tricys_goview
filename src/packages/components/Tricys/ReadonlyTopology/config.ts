import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { TricysReadonlyTopologyConfig } from './index'
import { buildSceneAssetOption } from '../sceneAssetShared'
import { getTricysContext } from '@/utils'

export const option = buildSceneAssetOption({
  dataset: {
    title: 'TRICYS 3D SCENE',
    subtitle: 'Goview draggable scene asset'
  },
  interaction: {
    mode: 'canvas',
    wheelZoom: true,
    panEnabled: false
  }
})

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TricysReadonlyTopologyConfig.key
  public attr = { ...chartInitConfig, w: 640, h: 420, zIndex: 1 }
  public chartConfig = cloneDeep(TricysReadonlyTopologyConfig)
  public option = cloneDeep(option)

  constructor() {
    super()
    this.option.dataset.projectId = getTricysContext().projectId || ''
  }
}