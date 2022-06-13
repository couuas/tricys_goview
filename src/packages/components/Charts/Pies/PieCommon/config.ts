import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { PieCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import dataJson from './data.json'

export const includes = ['legend']

export const option = {
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    show: true,
  },
  dataset: { ...dataJson },
  series: [
    {
      type: 'pie',
      radius: [40, 65],
      center: ['50%', '60%'],
      color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
      itemStyle: {
        show: true,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
        borderType: 'solid',
        shadowBlur: 10,
        shadowColor: "#97e2f5"
      },
      label: {
        show: false,
        position: 'center'
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

export default class Config extends publicConfig implements CreateComponentType {
  public key: string = PieCommonConfig.key

  public chartConfig = PieCommonConfig

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
