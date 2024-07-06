import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DeviceRunningStateConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {}
export const customData = {
  title: '设备运行状态',
  config: JSON.stringify([
    {"id":84,"label":"动力设备","code":"DL","remark":" 高压柜、低压柜、UPS、蓄电池等关于电的动力设备","icon":" ","father_id":0,"complete_id":"84","complete_name":"动力设备","sort":0,"is_leaf_node":false,"father_type":null,"need_data_num":0},
    {"id":87,"label":"环境设备","code":"HJ","remark":"温湿度、空调、漏水、气体等监测或影响环境因素的设备 ","icon":" ","father_id":0,"complete_id":"87","complete_name":"环境设备","sort":0,"is_leaf_node":false,"father_type":null,"need_data_num":0},
    {"id":90,"label":"安防设备","code":"AF","remark":" 视频、门禁、红外、消防及其他安防类设备","icon":" ","father_id":0,"complete_id":"90","complete_name":"安防设备","sort":0,"is_leaf_node":false,"father_type":null,"need_data_num":0}
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
