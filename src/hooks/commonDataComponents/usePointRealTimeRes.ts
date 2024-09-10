import { publicInterface } from "@/api/path";
import { commonDataType, PointRealTimeType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import dataJson from "./data.json";

export const handlePointRealTime = (targetComponent: CreateComponentType) => {
    let { enable, point_uid, limit, with_device_name, space_complete_name_prefix } = (targetComponent.commonData as commonDataType).pointRealTime as PointRealTimeType
    if(!enable) return {
        errcode: ResultErrcode.SUCCESS,
        data: { ...dataJson },
        errmsg: ''
    }

    const query = {
        point_uid,
        limit,
        with_device_name,
        space_complete_name_prefix,
    }
    return publicInterface('/dcim/system/custom_large_screen', 'get_point_realtime_data', query)
}
