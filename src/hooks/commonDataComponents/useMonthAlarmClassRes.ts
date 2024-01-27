import { publicInterface } from "@/api/path";
import { MonthAlarmClassType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import dataJson from "./data.json";

export const handleMonthAlarmClass = (targetComponent: CreateComponentType) => {
  const obj = targetComponent.commonData[targetComponent.commonData.currentSource]
  let { enable, confirm_statuses, recovery_statuses, levels, space_complete_id } = obj as MonthAlarmClassType
  if(!enable) return {
    errcode: ResultErrcode.SUCCESS,
    data: { ...dataJson },
    errmsg: ''
  }

  const query = {
    confirm_statuses,
    recovery_statuses,
    levels,
    space_complete_id,
  }
  return publicInterface('/dcim/system/custom_large_screen', 'count_by_asset_type', query)
}
