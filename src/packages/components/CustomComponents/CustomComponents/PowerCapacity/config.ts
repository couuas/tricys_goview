import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { PowerCapacityConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {}
export const customData = {
  title: '功率容量',
  enable: false,
  topBox: {
    name: '一号楼', label: '设计容量', value: 20000, label1: '已使用', calculation: '', name1: '', upper_limit: 0, floor: [
      {label: '1F', calculation: '', name: '', upper_limit: 0},
      {label: '2F', calculation: '', name: '', upper_limit: 0},
      {label: '3F', calculation: '', name: '', upper_limit: 0},
      {label: '4F', calculation: '', name: '', upper_limit: 0},
    ]
  },
  bottomBox: {
    name: '二号楼', label: '设计容量', value: 20000, label1: '已使用', calculation: '', name1: '', upper_limit: 0, floor: [
      {label: '1F', calculation: '', name: '', upper_limit: 0},
      {label: '2F', calculation: '', name: '', upper_limit: 0},
      {label: '3F', calculation: '', name: '', upper_limit: 0},
      {label: '4F', calculation: '', name: '', upper_limit: 0},
      {label: '5F', calculation: '', name: '', upper_limit: 0},
    ]
  },
  showInterval: true,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  constructor() {
    super();
    this.attr.w = 450
    this.attr.h = 300
    this.request.requestInterval = 15
  }
  public key = PowerCapacityConfig.key
  public chartConfig = cloneDeep(PowerCapacityConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep(customData)
}
