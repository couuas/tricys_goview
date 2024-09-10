import { publicInterface } from "@/api/path";
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import { CurrentSourceEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import dataJson from "./data.json";

export const handleNoParam = (targetComponent: CreateComponentType) => {
  const obj = targetComponent.commonData[targetComponent.commonData.currentSource]
  const list = [
    {
      name: CurrentSourceEnum.DEVICECLASS,
      apiPrefix: '/dcim/system/custom_large_screen',
      apiSuffix: 'count_device_by_device_type_active'
    }
  ]
  let target = list.find(_ => _.name === targetComponent.commonData.currentSource) || { name: '', apiPrefix: '', apiSuffix: '' }
  let { enable } = obj
  if(!enable) return {
    errcode: ResultErrcode.SUCCESS,
    data: { ...dataJson },
    errmsg: ''
  }

  return publicInterface(target.apiPrefix, target.apiSuffix, {})
}
