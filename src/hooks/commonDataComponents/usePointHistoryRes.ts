import moment from "moment";
import { publicInterface } from "@/api/path";
import { DateTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { commonDataType, PointHistoryType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import dataJson from "./data.json";

export const handlePointHistory = (targetComponent: CreateComponentType) => {
    let { methods, dems_device_points_uid, dateType, enable } = (targetComponent.commonData as commonDataType).pointHistory as PointHistoryType
    if(!enable) return {
        errcode: ResultErrcode.SUCCESS,
        data: { ...dataJson },
        errmsg: ''
    }
    let start_time: string = '', end_time: string = '', duration: number = 0
    const formatter = 'yyyy-MM-DD HH:mm:ss'
    if(dateType === DateTypeEnum.DAY) {
        start_time = moment().subtract(1, 'd').format(formatter)
        end_time = moment().format(formatter)
        duration = 60 * 60
    }
    else if(dateType === DateTypeEnum.MONTH) {
        start_time = moment().subtract(1, 'M').format(formatter)
        end_time = moment().format(formatter)
        duration = 24 * 60 * 60
    }
    else if(dateType === DateTypeEnum.YEAR) {
        start_time = moment().subtract(1, 'y').format(formatter)
        end_time = moment().format(formatter)
        duration = 30 * 24 * 60 * 60
    }

    const query = {
        methods,
        dems_device_points_uid: dems_device_points_uid.filter(_ => _),
        start_time,
        end_time,
        duration,
    }
    return publicInterface('/dcim/system/custom_large_screen', 'row_reports', query)
}
