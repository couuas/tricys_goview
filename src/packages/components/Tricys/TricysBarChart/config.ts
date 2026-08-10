import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TricysBarChartConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
    dataset: {
        projectId: '',
        taskId: '',
        jobId: 0,
        variables: ['sds.I[1]']
    },
    tooltip: {
        show: true,
        trigger: 'axis'
    },
    xAxis: {
        show: true,
        type: 'category',
        axisLabel: { color: '#B4B4B4' },
        axisLine: { lineStyle: { color: '#B4B4B4' } }
    },
    yAxis: {
        show: true,
        type: 'value',
        axisLabel: { color: '#B4B4B4' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    series: [
        {
            type: 'bar',
            barWidth: '40%'
        }
    ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = TricysBarChartConfig.key
    public attr = { ...chartInitConfig, w: 500, h: 300, zIndex: 1 }
    public chartConfig = cloneDeep(TricysBarChartConfig)
    public option = cloneDeep(option)
}
