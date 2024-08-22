import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { LineCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']
export const seriesItem = {
  type: 'line',
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  symbolSize: 0, //设定实心点的大小
  smooth: true,
  itemStyle: {
    color: null,
    borderRadius: 0
  },
  lineStyle: {
    type: 'solid',
    width: 3,
    color: null
  },
  yAxisIndex: 0
}

export const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  xAxis: {
    show: true,
    type: 'category'
  },
  yAxis: [
    {
      show: true,
      type: 'value',
      min: null
    },
    {
      show: false,
      type: 'value',
      min: null
    }
  ],
  dataZoom:{
    show: false,
    height: 5,
    xAxisIndex: [0],
    bottom: 10,
    showDetail: false,
    showDataShadow: false,
    borderColor: 'transparent',
    textStyle: {
      fontSize: 0
    },
    startValue: 0,
    endValue: 5, // 从0开始的7个
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    handleSize: '0%',
    handleStyle: {
      color: '#d3dee5'
    }
  },
  dataset: { ...dataJson },
  series: [seriesItem, seriesItem],
  allSeriesConfig: seriesItem
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = LineCommonConfig.key
  public chartConfig = cloneDeep(LineCommonConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
