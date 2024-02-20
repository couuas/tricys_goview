import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { EngineeringConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // // 图片路径
  // dataset: '',
  // // 适应方式
  // fit: 'contain',
  // // 圆角
  // borderRadius: 0
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.attr.w = 960
    this.attr.h = 540
  }
  public key = EngineeringConfig.key
  public chartConfig = cloneDeep(EngineeringConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep({
    showInterval: false,
    mapId: null
  })
}
