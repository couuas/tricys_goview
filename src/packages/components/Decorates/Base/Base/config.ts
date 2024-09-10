import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { BaseConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // 图片
  dataset: '',
  // 适应方式
  fit: 'fill',
  // 圆角
  // borderRadius: 0
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.attr = {
      ...this.attr,
      w: 500,
      h: 500,
    }
  }
  public key = BaseConfig.key
  public chartConfig = cloneDeep(BaseConfig)
  public option = cloneDeep(option)
}
