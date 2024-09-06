import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { PieCommon3Config } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

export enum PieTypeEnum {
  NORMAL = '常规图',
  RING = '环形图',
  ROSE = '玫瑰图',
  RINGROSE = '环形玫瑰图'
}

export const PieTypeObject = {
  [PieTypeEnum.NORMAL]: 'normal',
  [PieTypeEnum.RING]: 'ring',
  [PieTypeEnum.ROSE]: 'rose',
  [PieTypeEnum.RINGROSE]: 'ringrose'
}

// 其它配置
const otherConfig = {
  // 轮播动画
  isCarousel: false,
  legendShowValue: false
}
const color = [
  '#F5B442',
  '#FF8A66',
  '#FF6D55',
  '#FF3342',
  '#F23DAD',
  '#B73FEF',
  '#F23DAD',
  '#B73FEF',
  '#6F40ED',
  '#5945ED'
]

const option = {
  ...otherConfig,
  backgroundColor: 'rgba(255,255,255,1)',
  color,
  type: 'pie',
  tooltip: {
    show: true,
    trigger: 'item'
    // valueFormatter :function(value:string){
    //   // console.log(name,'name-formatter')
    //   return ''+value
    // }
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    x: 'left',
    top: 'center',
    left: '0',
    right: '30%',
    bottom: '0%',
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 16,
    formatter: function (name: string) {
      return name.length > 5 ? name.substring(0, 5) + '...' : name;
    }
  },
  grid: {
    left: '3%',
},
  dataset: { ...dataJson },
  series: [
    {
      type: 'pie',
      clockwise: false, //饼图的扇区是否是顺时针排布
      // minAngle: 2, //最小的扇区角度（0 ~ 360）
      radius: ['0%', '50%'],
      center: ['30%', '50%'],
      avoidLabelOverlap: false,
      //  itemStyle: { //图形样式
      //     normal: {
      //         borderColor: '#ffffff',
      //         borderWidth: 6,
      //     },
      // },
      label: {
        normal: {
          show: false,
          position: 'center',
          formatter: '{text|{b}}\n{c} ({d}%)',
          rich: {
            text: {
              color: '#666',
              fontSize: 14,
              align: 'center',
              verticalAlign: 'middle',
              padding: 8
            },
            value: {
              color: '#8693F3',
              fontSize: 24,
              align: 'center',
              verticalAlign: 'middle'
            }
          }
        },
        emphasis: {
          show: false,
          textStyle: {
            fontSize: 24
          }
        }
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = PieCommon3Config.key

  public chartConfig = cloneDeep(PieCommon3Config)

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
