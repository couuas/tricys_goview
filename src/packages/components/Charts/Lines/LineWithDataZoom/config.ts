import {echartOptionProfixHandle, PublicConfigClass, setData} from '@/packages/public'
import {LineWithDataZoomConfig} from './index'
import {CreateComponentType} from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'
import { graphic } from 'echarts'
// import { getData } from './api'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid', 'tooltip', 'dataZoom']

export const seriesItem = {
    type: 'line',
    showSymbol: false,
    symbol: 'circle',
    symbolSize: 8,
    smooth: true,
    label: {
        show: false
    },
    tooltip: {
        show: true
    },
    lineStyle: {
        normal: {
            color: '#4196ff',
        }
    },
    itemStyle: {
        normal: {
            color: '#4196ff',
            borderColor: '#4196ff'
        }
    },
    areaStyle: {
        normal: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(65,150,255,0.5)'
            },
                {
                    offset: 1,
                    color: 'rgba(65,150,255,0)'
                }
            ], false),
            shadowColor: 'rgba(65,150,255,0.3)',
            shadowBlur: 20
        }
    },
}

// let res = await getData()

export const option = {
    legend: {
        show: false,
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
            show: false
        },
        axisLabel: {
            color: '#ccc',
            fontSize: 12
        },
        axisTick: {
            show: false
        },
    },
    yAxis: {
        nameTextStyle: {
            color: '#999'
        },
        type: 'value',
        axisLabel: {
            color: '#ccc',
            fontSize: 12
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: 'dashed',
                color: 'rgba(65, 150, 255, 0.2)'
            }
        },
        axisLine: {
            show: false
        }
    },
    grid: {
        top: '16px',
        left: '16px',
        right: '16px',
        bottom: '32px',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        formatter: null
    },
    dataZoom: [
        {
            show: true,
            start: 0,
            end: 100,
            height: 20,
            bottom: 10,
            textStyle: {
                color: '#ccc'
            },
            dataBackground: {
                areaStyle: {
                    color: '#353549',
                    borderColor: '#34424f'
                },
                lineStyle: {
                    color: '#364e68'
                }
            },
            backgroundColor: '#222b35',
            borderColor: '#34424f',
            handleStyle: {
                color: '#222b35',
                borderColor: '#27558e'
            },
            moveHandleStyle: {
                color: '#1b2e46',
                borderColor: '#364e68'
            },
            emphasis: {
                moveHandleStyle: {
                    color: '#2c5a92',
                    borderColor: '#364e68'
                }
            }
        },
        {
            type: 'inside',
            start: 0,
            end: 100
        },
        {
            show: true,
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 20,
            height: '80%',
            showDataShadow: false,
            right: 0,
            textStyle: {
                color: '#ccc'
            },
            dataBackground: {
                areaStyle: {
                    color: '#353549',
                    // color: '#ff0000',
                    borderColor: '#34424f'
                },
                lineStyle: {
                    color: '#364e68'
                }
            },
            backgroundColor: '#222b35',
            borderColor: '#34424f',
            handleStyle: {
                color: '#222b35',
                borderColor: '#27558e'
            },
            moveHandleStyle: {
                color: '#1b2e46',
                borderColor: '#364e68'
            },
            emphasis: {
                moveHandleStyle: {
                    color: '#2c5a92',
                    borderColor: '#364e68'
                }
            }
        }
    ],
    dataset: {...dataJson},
    series: Array(8).fill({}).map(_ => cloneDeep(seriesItem))
}

// setInterval(async() => {
//     res = await getData()
//     if (res !== undefined) setData(option, res)
// }, 15000)

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key: string = LineWithDataZoomConfig.key
    public chartConfig = cloneDeep(LineWithDataZoomConfig)
    // 图表配置项
    public option = echartOptionProfixHandle(option, includes)
}
