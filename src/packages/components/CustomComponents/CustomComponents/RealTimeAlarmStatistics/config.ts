import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { RealTimeAlarmStatisticsConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import background from '@/assets/customComponents/theme1/backgrond.jpg'

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
  public key = RealTimeAlarmStatisticsConfig.key
  public chartConfig = cloneDeep(RealTimeAlarmStatisticsConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep({
    title: '实时告警统计',
    showInterval: true,
  })
}
