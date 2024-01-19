import moment from "moment";
import { publicInterface } from "@/api/path";
import { DateTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { commonDataType, EnergyUseHistoryType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'

export const handleEnergyUseHistory = (targetComponent: CreateComponentType) => {
    let { strategy_ids, dateType, enable } = (targetComponent.commonData as commonDataType).energyUseHistory as EnergyUseHistoryType
    if(!enable) return
    let start_time: string = '', end_time: string = '', duration: number = 0
    const formatter = 'yyyy-MM-DD HH:mm:ss'
    if(dateType === DateTypeEnum.DAY) {
        start_time = moment().subtract(1, 'd').format(formatter)
        end_time = moment().format(formatter)
        duration = 2
    }
    else if(dateType === DateTypeEnum.MONTH) {
        start_time = moment().subtract(1, 'M').format(formatter)
        end_time = moment().format(formatter)
        duration = 3
    }
    else if(dateType === DateTypeEnum.YEAR) {
        start_time = moment().subtract(1, 'y').format(formatter)
        end_time = moment().format(formatter)
        duration = 4
    }

    const query = {
        start_time,
        end_time,
        duration,
        strategy_ids
    }
    return publicInterface('/dcim/system/custom_large_screen', 'err', query)
}
