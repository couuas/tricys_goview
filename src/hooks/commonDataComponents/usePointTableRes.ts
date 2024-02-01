import moment from "moment";
import { publicInterface } from "@/api/path";
import { DateTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { commonDataType, PointTableType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from '@/enums/httpEnum'
import dataJson from './data.json'

export const handlePointTable = (targetComponent: CreateComponentType) => {
    let { ids, enable } = (targetComponent.commonData as commonDataType).pointTable as PointTableType
    if(!enable) return {
        errcode: ResultErrcode.SUCCESS,
        data: { ...dataJson },
        errmsg: ''
    }
    return publicInterface('/dcim/system/custom_large_screen', 'get_table_point_value', ids)
}
