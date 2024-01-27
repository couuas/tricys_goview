import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { PieCommon2Config } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

export enum PieTypeEnum {
  NORMAL = '常规图',
  RING = '环形图',
  ROSE = '玫瑰图',
  RINGROSE = '环形玫瑰图',
}

export const PieTypeObject = {
  [PieTypeEnum.NORMAL]: 'normal',
  [PieTypeEnum.RING]: 'ring',
  [PieTypeEnum.ROSE]: 'rose',
  [PieTypeEnum.RINGROSE]: 'ringrose',
}

// 其它配置
const otherConfig = {
  // 轮播动画
  isCarousel: false,
}

const option = {
  ...otherConfig,
  type: 'rose',
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    show: true
  },
  dataset: { ...dataJson },
  series: [
    {
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['50%', '50%'],
      roseType: false,
      avoidLabelOverlap: false,
      itemStyle: {
        show: true,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center',
        formatter: '{b}',
        fontSize:12
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = PieCommon2Config.key

  public chartConfig = cloneDeep(PieCommon2Config)

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
