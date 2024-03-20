import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { BackgroundsConfig } from './index'
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
      h: 1080,
      x: 0,
      y: 0,
      // 置于工程组态前插入
      isBeforeEngineerging: true
    }
  }
  public key = BackgroundsConfig.key
  public chartConfig = cloneDeep(BackgroundsConfig)
  public option = cloneDeep(option)
}
