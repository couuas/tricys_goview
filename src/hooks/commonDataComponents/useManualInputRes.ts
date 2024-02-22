import { publicInterface } from "@/api/path";
import { commonDataType, ManualInputType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import dataJson from './data.json'

export const handleManulInput = (targetComponent: CreateComponentType) => {
    let { enable, dataset } = (targetComponent.commonData as commonDataType).manualInput as ManualInputType
    if(!enable) return {
        errcode: ResultErrcode.SUCCESS,
        data: { ...dataJson },
        errmsg: ''
    }

    return {
        errcode: ResultErrcode.SUCCESS,
        data: dataset,
        errmsg: ''
    }
}
