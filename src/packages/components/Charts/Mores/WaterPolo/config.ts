import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { WaterPoloConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { CurrentSourceEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

export const shapes = [
  {
    label: '圆形',
    value: 'circle'
  },
  {
    label: '正方形',
    value: 'rect'
  },
  {
    label: '带圆角的正方形',
    value: 'roundRect'
  },
  {
    label: '正三角形',
    value: 'triangle'
  },
  {
    label: '菱形',
    value: 'diamond'
  },
  {
    label: '水滴',
    value: 'pin'
  },
  {
    label: '箭头',
    value: 'arrow'
  },
]

export const includes = []

export const option = {
  dataset: 0.5,
  series: [
    {
      type: 'liquidFill',
      shape: shapes[0].value,
      radius: '90%',
      data: [
        {
          name: '',
          value: 0,
          unit: '',
          showValue: 0,
          config: {
            showPercent: false,
            showUnit: false,
            showSubText: true,
            showSubTextUnit: true,
            max: 100,
          }
        }
      ],
      center: ['50%', '50%'],
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#446bf5',
            },
            {
              offset: 1,
              color: '#2ca3e2',
            },
          ],
          globalCoord: false,
        },
      ],
      backgroundStyle: {
        borderWidth: 1,
        color: 'rgba(51, 66, 127, 0.7)',
      },
      label: {
        normal: {
          textStyle: {
            fontSize: 40,
            color: '#fff',
          },
          formatter: (param:any) => {
            const { showPercent, showUnit, showSubText, showSubTextUnit } = param.data.config
            const { name, value, unit, showValue } = param.data

            let str = ''
            if(showPercent) str += `${showValue * 100}%`
            else str += showUnit ? `${showValue}${unit}` : showValue

            str += '\n'
            if(showSubText) str += name
            if(showSubTextUnit && unit) str += showSubText ? `(${unit})` : unit
            return str
          }
        },
      },
      outline: {
        show: false,
        borderDistance: 10,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#112165'
        }
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.commonData.currentSource = CurrentSourceEnum.SINGLEPOINT
  }
  public key = WaterPoloConfig.key
  public chartConfig = cloneDeep(WaterPoloConfig)
  public option = echartOptionProfixHandle(option, includes)
}
