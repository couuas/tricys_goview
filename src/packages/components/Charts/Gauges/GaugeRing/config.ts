import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { GaugeRingConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import dataJson from './data.json'

const option = {
  dataset: { ...dataJson },
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 1,
          borderColor: '#464646'
        }
      },
      axisLine: {
        lineStyle: {
          width: 40
        }
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false,
        distance: 50
      },
      title: {
        fontSize: 14,
        offsetCenter: ['0%', '-10%']
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 20,
        color: 'auto',
        borderColor: 'auto',
        borderRadius: 20,
        borderWidth: 0,
        formatter: '{value}%',
        valueAnimation: true,
        offsetCenter: ['0%', '0%']
      }
    }
  ]
}

export default class Config extends publicConfig implements CreateComponentType {
  public key: string = GaugeRingConfig.key

  public chartConfig = GaugeRingConfig

  // 图表配置项
  public option = echartOptionProfixHandle(option,[])
}
