import moment from "moment";
import { publicInterface } from "@/api/path";
import { DateTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { commonDataType, RecordValueHistoryType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import dataJson from "./data.json";

export const handleRecordValueHistory = (targetComponent: CreateComponentType) => {
    let { policy, strategy_ids, dateType, enable } = (targetComponent.commonData as commonDataType).recordValueHistory as RecordValueHistoryType
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
        amount: 1,
        chart_type: 'line',
        duration,
        policy,
        strategy_ids: strategy_ids.filter(_ => _),
        start_time,
        end_time,
    }
    return publicInterface('/dcim/system/custom_large_screen', 'sum', query)
}
