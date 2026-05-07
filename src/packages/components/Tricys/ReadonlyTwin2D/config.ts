import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { buildSceneAssetOption } from '../sceneAssetShared'
import { TricysReadonlyTwin2DConfig } from './index'

export const option = buildSceneAssetOption({
  dataset: {
    title: 'TRICYS 2D TWIN',
    subtitle: 'Goview draggable twin asset'
  },
  interaction: {
    mode: 'canvas',
    wheelZoom: true,
    panEnabled: true
  }
})

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TricysReadonlyTwin2DConfig.key
  public attr = { ...chartInitConfig, w: 640, h: 380, zIndex: 1 }
  public chartConfig = cloneDeep(TricysReadonlyTwin2DConfig)
  public option = cloneDeep(option)
}