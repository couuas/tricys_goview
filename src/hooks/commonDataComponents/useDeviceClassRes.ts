import { publicInterface } from "@/api/path";
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import { DeviceClassType } from '@/store/modules/chartEditStore/chartEditStore.d'
import dataJson from "./data.json";

export const handleDeviceClass = (targetComponent: CreateComponentType) => {
  const obj = targetComponent.commonData[targetComponent.commonData.currentSource] as DeviceClassType
  let { enable, space_complete_id } = obj
  if(!enable) return {
    errcode: ResultErrcode.SUCCESS,
    data: { ...dataJson },
    errmsg: ''
  }
  const query = {
    space_complete_id
  }
  return publicInterface('/dcim/system/custom_large_screen', 'count_device_by_device_type_active', query)
}
