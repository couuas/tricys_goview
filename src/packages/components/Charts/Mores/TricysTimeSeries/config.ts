import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TricysTimeSeriesConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
    // Default ECharts option
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        textStyle: {
            color: '#B4B4B4'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
            color: '#B4B4B4'
        },
        axisLine: {
            lineStyle: {
                color: '#B4B4B4'
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#B4B4B4'
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.1)'
            }
        }
    },
    series: [],
    // Custom dataset for Tricys
    dataset: {
        taskId: '',
        variables: ['sds.I', 'wds.T'], // Example variables
        jobId: null
    }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = TricysTimeSeriesConfig.key
    public attr = { ...chartInitConfig, w: 600, h: 400, zIndex: 1 }
    public chartConfig = cloneDeep(TricysTimeSeriesConfig)
    public option = cloneDeep(option)
}
