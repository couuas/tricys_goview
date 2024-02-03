import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { RadarConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

// 雷达形状
export const RadarShapeEnumList = [
  { label: '多边形', value: 'polygon' },
  { label: '圆形', value: 'circle' }
]

interface maxMapType {
  [k: string]: {
    max: number,
    min: number
  }
}

export const option = {
  maxMap: {} as maxMapType,
  tooltip: {
    show: true
  },
  legend: {
    data: []
  },
  dataset: {
    dimensions: [],
    source: []
  },
  radar: {
    shape: 'polygon',
    radius: ['0%', '60%'],
    center: ['50%', '55%'],
    splitArea: { show: true },
    splitLine: { show: true },
    axisName: { show: true, color: '#eee', fontSize: 12 },
    axisLine: { show: true },
    axisTick: { show: false },
    indicator: []
  },
  series: [
    {
      name: 'radar',
      type: 'radar',
      areaStyle: {
        opacity: 0.1
      },
      data: []
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = RadarConfig.key
  public chartConfig = cloneDeep(RadarConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
