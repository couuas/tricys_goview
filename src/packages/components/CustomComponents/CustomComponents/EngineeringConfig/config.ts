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
  left: 0,
  top: 0,
  scale: 1,
  // 展示标题
  isThereATitleComponet: false,
  // 控制内层 使外层选中失效
  enableInner: false
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.attr.w = 1920
    this.attr.h = 1080
    this.attr.x = 0
    this.attr.y = 0
  }
  public key = EngineeringConfig.key
  public chartConfig = cloneDeep(EngineeringConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep({
    showInterval: false,
    mapId: null
  })
}
