import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { GDMapConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {
  // 图片路径
  dataset: '',
  // 适应方式
  fit: 'contain',
  // 圆角
  borderRadius: 0
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.attr.w = 950
    this.attr.h = 820
    this.request.requestInterval = 15
  }
  public key = GDMapConfig.key
  public chartConfig = cloneDeep(GDMapConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep({
    showInterval: true,
    mapId: null
  })
}
