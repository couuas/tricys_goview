import { publicInterface } from "@/api/path";
import { commonDataType, ManualInputSingleType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import singleDataJson from './singleData.json'

export const handleManulInputSingle = (targetComponent: CreateComponentType) => {
    let { enable, result } = (targetComponent.commonData as commonDataType).manualInputSingle as ManualInputSingleType
    if(!enable) return {
        errcode: ResultErrcode.SUCCESS,
        data: { ...singleDataJson },
        errmsg: ''
    }

    return {
        errcode: ResultErrcode.SUCCESS,
        data: result,
        errmsg: ''
    }
}
