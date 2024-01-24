import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DeviceAlarmOverviewConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {
  // 图片路径
  dataset: '',
  // 适应方式
  fit: 'contain',
  // 圆角
  borderRadius: 0
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.attr.w = 450
    this.attr.h = 300
    this.request.requestInterval = 15
  }
  public key = DeviceAlarmOverviewConfig.key
  public chartConfig = cloneDeep(DeviceAlarmOverviewConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep({
    title: '当前设备告警概况',
    showInterval: true,
    space_complete_id: '',
  })
}
