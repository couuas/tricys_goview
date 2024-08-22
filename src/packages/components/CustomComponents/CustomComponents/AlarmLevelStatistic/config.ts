import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { AlarmLevelStatistic } from './index'
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
  public key = AlarmLevelStatistic.key
  public chartConfig = cloneDeep(AlarmLevelStatistic)
  public option = cloneDeep(option)
  public customData = cloneDeep({
    title: '告警等级数统计',
    showInterval: true,
    currentSource:'level',
    // 告警确认状态
    alarmConfirmStatus:['ok','not'],
    // 告警恢复状态
    alarmRecoveryStatus:['ok','not'],
    signal_ids:'131240020010',
    // space_complete_id:''
  })
}
