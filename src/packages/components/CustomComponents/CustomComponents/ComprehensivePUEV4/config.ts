import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ComprehensivePUEV4Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {
  // // 图片路径
  // dataset: '',
  // // 适应方式
  // fit: 'contain',
  // // 圆角
  // borderRadius: 0
}
export const customData = {
  title: '综合PUE',
  enable: false,
  id: null,
  circle: {
    title: '昨日PUE',
  },
  center: {
    title1: '实时PUE',
    title2: '上周PUE',
    title3: '上月PUE',
  },
  right: {
    title1: '总功率(kWh)',
    calculation1: '',
    title2: 'IT功率(kW)',
    calculation2: '',
    title3: '其他功率(kW)',
  },
  showInterval: true,
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.attr.w = 450
    this.attr.h = 300
    this.request.requestInterval = 15
  }
  public key = ComprehensivePUEV4Config.key
  public chartConfig = cloneDeep(ComprehensivePUEV4Config)
  public option = cloneDeep(option)
  public customData = cloneDeep(customData)
}
