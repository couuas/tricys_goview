import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { PositionConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {}
export const customData = {
  label: '数据中心',
  id: null,
  showInterval: true,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  constructor() {
    super();
    this.attr.w = 100
    this.attr.h = 100
    this.request.requestInterval = 15
  }
  public key = PositionConfig.key
  public chartConfig = cloneDeep(PositionConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep(customData)
}
