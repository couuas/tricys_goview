import { FunnelConfig } from './index'
import dataJson from './data.json'
import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'

export const includes = ['legend']

export const option = {
    title: {
      textStyle: {},
    },
    legend: {},
    color: [
      '#142f53', '#13407e',  '#0f62d4', '#0c73ff'
    ],
    tooltip: {
      show: true,
      trigger: 'item',
    },
    dataset: {
      ...dataJson
    },
    series: {
      sort: 'descending',
      orient: 'vertical',
      type: 'funnel',
      label: {
        show: true,
        position: 'inside'
      }
    },
  }

  export default class Config extends publicConfig implements CreateComponentType {
    public key = FunnelConfig.key
    public chartConfig = cloneDeep(FunnelConfig)
    // 图表配置项
    public option = echartOptionProfixHandle(option, includes)
  }
  