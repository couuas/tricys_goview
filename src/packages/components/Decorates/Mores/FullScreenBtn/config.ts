import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { FullScreenBtnConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export enum FontWeightEnum {
  NORMAL = '常规',
  BOLD = '加粗',
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold',
}

export const option = {
  color: '#4396fd',
  fontSize: 14,
  fontWeight: 'normal',
  border: 1,
  borderColor: '#4396fd'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = FullScreenBtnConfig.key
  public attr = { ...chartInitConfig, w: 100, h: 40, zIndex: -1 }
  public chartConfig = cloneDeep(FullScreenBtnConfig)
  public option = cloneDeep(option)
}
