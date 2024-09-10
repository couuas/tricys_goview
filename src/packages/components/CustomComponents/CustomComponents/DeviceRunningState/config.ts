import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DeviceRunningStateConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {}
export const customData = {
  title: '设备运行状态',
  config: JSON.stringify([
    {
      "code": "DLSB"
    },
    {
      "code": "ZNSB"
    },
    {
      "code": "HJSB"
    },
    {
      "code": "AFSB"
    },
    {
      "code": "QTSB"
    }
  ]),
  showInterval: true,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  constructor() {
    super();
    this.attr.w = 450
    this.attr.h = 300
    this.request.requestInterval = 15
  }
  public key = DeviceRunningStateConfig.key
  public chartConfig = cloneDeep(DeviceRunningStateConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep(customData)
}
