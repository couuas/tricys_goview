import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TextGradientConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { CurrentSourceEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

export const option = {
  dataset: '我是渐变文本',
  showUnit: false,
  size: 20,
  gradient: {
    from: '#0000FFFF',
    to: '#00FF00FF',
    deg: 45
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  constructor() {
    super();
    this.commonData.currentSource = CurrentSourceEnum.SINGLEPOINT
  }
  public key = TextGradientConfig.key
  public chartConfig = cloneDeep(TextGradientConfig)
  public option = cloneDeep(option)
}
