import { publicInterface } from "@/api/path";
import { commonDataType, SinglePointType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'

export const handleSinglePoint = (targetComponent: CreateComponentType) => {
    let { enable, pointId } = (targetComponent.commonData as commonDataType).singlePoint as SinglePointType
    if(!enable) return

    return publicInterface('/dcim/system/custom_large_screen', 'get_point_value', pointId)
}
