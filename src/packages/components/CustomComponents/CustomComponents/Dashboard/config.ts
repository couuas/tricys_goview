import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DashboardConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'
import { CurrentSourceEnum } from '@/store/modules/chartEditStore/chartEditStore.d'


export const option = {
  dataset: 0,
  showUnit: false,
  showSubtext: true,
  showSubtextUnit: true,
  min: 0,
  max: 100,
  titleFontSize: 24,
  titleColor: '#fff',
  subtextFontSize: 20,
  subtextColor: '#fff'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  constructor() {
    super();
    this.attr.w = 250
    this.attr.h = 250
    this.commonData.currentSource = CurrentSourceEnum.SINGLEPOINT
  }
  public key = DashboardConfig.key
  public chartConfig = cloneDeep(DashboardConfig)
  public option = cloneDeep(option)
}
