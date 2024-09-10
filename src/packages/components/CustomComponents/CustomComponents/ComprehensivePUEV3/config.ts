import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ComprehensivePUEV3Config } from './index'
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
  circle: {
    title: '实时PUE',
    id: null
  },
  leftBottom: [
    {
      title: '昨日PUE',
      id: null
    },
    {
      title: '上周PUE',
      id: null
    },
    {
      title: '上月PUE',
      id: null
    }
  ],
  right: [
    {
      title: '总市电负载',
      unit: '(kWh)',
      id: null
    },
    {
      title: 'IT用电负载',
      unit: '(kWh)',
      id: null
    },
    {
      title: '其他负载',
      unit: '(kWh)',
      id: null
    }
  ],
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
  public key = ComprehensivePUEV3Config.key
  public chartConfig = cloneDeep(ComprehensivePUEV3Config)
  public option = cloneDeep(option)
  public customData = cloneDeep(customData)
}
