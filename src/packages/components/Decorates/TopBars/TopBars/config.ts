import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TopBarsConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // 图片
  dataset: '',
  // 适应方式
  fit: 'fill',
  // 圆角
  borderRadius: 0
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.attr = {
      ...this.attr,
      w: 1920,
      h: 80,
    }
  }
  public key = TopBarsConfig.key
  public chartConfig = cloneDeep(TopBarsConfig)
  public option = cloneDeep(option)
}
