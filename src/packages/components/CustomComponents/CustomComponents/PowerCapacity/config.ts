import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { PowerCapacityConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {}
export const customData = {
  title: '功率容量',
  enable: false,
  arr: [
    {
      name: '一号楼', show: true, label: '设计容量', value: 20000, label1: '已使用', calculation: '', floor: [
        { label: '1F', calculation: '' },
      ]
    },
    {
      name: '二号楼', show: true, label: '设计容量', value: 20000, label1: '已使用', calculation: '', floor: [
        { label: '1F', calculation: '' },
      ]
    }
  ],
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
