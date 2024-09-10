import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { RealTimeEventConfig } from './index'
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
    this.attr.w = 950
    this.attr.h = 300
    this.request.requestInterval = 15
  }
  public key = RealTimeEventConfig.key
  public chartConfig = cloneDeep(RealTimeEventConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep({
    title: '实时事件',
    showInterval: true,
    showFilter: false,
    space_complete_id: '',
    dems_device_point_signal_ids: [],
  })
}
