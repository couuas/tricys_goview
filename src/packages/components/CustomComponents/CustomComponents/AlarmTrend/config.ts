import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { AlarmTrend } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {}

export default class Config extends PublicConfigClass implements CreateComponentType {
  constructor() {
    super();
    this.attr.w = 450
    this.attr.h = 300
    this.request.requestInterval = 15
  }
  public key = AlarmTrend.key
  public chartConfig = cloneDeep(AlarmTrend)
  public option = cloneDeep(option)
  public customData = cloneDeep({
    title: '告警趋势',
    showInterval: true,
    signal_ids:'131240020010',
    alarmConfirmStatus:['ok','not'],
    alarmRecoveryStatus:['ok','not'],
    level:[1, 2, 3, 4, 5]
  })
}
