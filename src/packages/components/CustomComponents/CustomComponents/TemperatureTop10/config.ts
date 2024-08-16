import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TemperatureTop10Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {}
export const customData = {
  title: '区域温度TOP10',
  ids: '',
  demonstration: false,
  queryType: 'temp_list_dashboard',
  showInterval: true,
  colName1:'区域设备',
  colName2:'实时温度',
   queryTypeOptions : [
    {
      label: '区域温湿度',
      value:'temp_list_dashboard'
    },
    {
      label: '机房温湿度排名',
      value:'room_temp_sort_dashboard'
    },
    {
      label: '机房温湿度',
      value:'room_temp_dashboard'
    },
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  constructor() {
    super();
    this.attr.w = 450
    this.attr.h = 300
    this.request.requestInterval = 15
  }
  public key = TemperatureTop10Config.key
  public chartConfig = cloneDeep(TemperatureTop10Config)
  public option = cloneDeep(option)
  public customData = cloneDeep(customData)
}
