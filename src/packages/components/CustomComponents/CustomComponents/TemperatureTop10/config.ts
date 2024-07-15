import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TemperatureTop10Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {}
export const customData = {
  title: '区域温度TOP10',
  ids: '',
  demonstration: false,
  showInterval: true,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  constructor() {
    super();
    this.attr.w = 450
    this.attr.h = 300
    this.request.requestInterval = 15
  }
  public key = TemperatureTop10Config.key
  public chartConfig = cloneDeep(TemperatureTop10Config)
  public option = cloneDeep(option)
  public customData = cloneDeep(customData)
}
