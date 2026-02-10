import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TricysMetricsConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
    // Key-value pairs to display
    dataset: {
        taskId: '',
        metrics: ['efficiency', 'max_temp']
    },
    style: {
        fontSize: 24,
        color: '#ffffff',
        itemGap: 20
    }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = TricysMetricsConfig.key
    public attr = { ...chartInitConfig, w: 300, h: 200, zIndex: 1 }
    public chartConfig = cloneDeep(TricysMetricsConfig)
    public option = cloneDeep(option)
}
