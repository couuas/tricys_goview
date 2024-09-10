import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { PieCommon1Config } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

export enum PieTypeEnum {
  NORMAL = '常规图',
  RING = '环形图',
  ROSE = '玫瑰图'
}

export const PieTypeObject = {
  [PieTypeEnum.NORMAL]: 'normal',
  [PieTypeEnum.RING]: 'ring',
  [PieTypeEnum.ROSE]: 'rose'
}

// 其它配置
const otherConfig = {
  // 轮播动画
  isCarousel: false,
  legendShowValue: false,
}

const option = {
  ...otherConfig,
  type: 'ring',
  tooltip: {
    show: true,
    trigger: 'item',
    // formatter: (params: any) => {
    //   let str = `${params.seriesName}<br/>${params.marker}${params.name}`
    //   return str
    // }
  },
  legend: {
    show: true,
    formatter: (name: string) => {
      return name
    }
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
  public key: string = PieCommon1Config.key

  public chartConfig = cloneDeep(PieCommon1Config)

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
