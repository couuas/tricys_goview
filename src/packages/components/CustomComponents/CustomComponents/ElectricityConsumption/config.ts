import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ElectricityConsumptionConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {}
export const customData = {
  title: '近7日用电量',
  title1: '当月用电量',
  title2: '年用电量',
  enable: false,
  arr: [
    {id: null, name: '1号楼'},
    {id: null, name: '2号楼'},
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
  public key = ElectricityConsumptionConfig.key
  public chartConfig = cloneDeep(ElectricityConsumptionConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep(customData)
}
