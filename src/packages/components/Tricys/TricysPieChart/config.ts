import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TricysPieChartConfig } from './index'
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
        trigger: 'item'
    },
    series: [
        {
            type: 'pie',
            radius: '50%'
        }
    ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = TricysPieChartConfig.key
    public attr = { ...chartInitConfig, w: 500, h: 300, zIndex: 1 }
    public chartConfig = cloneDeep(TricysPieChartConfig)
    public option = cloneDeep(option)
}
