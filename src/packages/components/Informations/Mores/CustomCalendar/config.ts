// 公共类型
import { PublicConfigClass } from '@/packages/public'
// 公共类型
import { CreateComponentType } from '@/packages/index.d'
// 获取上面的 index 配置内容
import { CustomCalendarConfig } from './index'
// 深拷贝
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // 数据源字段
  dataset: [],
  // 配置项
  options1: '',
  options2: ''
  // ...
}

// 图表类
export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = CustomCalendarConfig.key
  public chartConfig = cloneDeep(CustomCalendarConfig)
  public option = cloneDeep(option)
}