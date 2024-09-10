import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TimeCommon1Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'


export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TimeCommon1Config.key
  public attr = { ...chartInitConfig, w: 200, h: 50, zIndex: -1 }
  public chartConfig = cloneDeep(TimeCommon1Config)
  public option = cloneDeep({})
}
