import { publicInterface } from "@/api/path";
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import { AlarmTrendType } from '@/store/modules/chartEditStore/chartEditStore.d'
import dataJson from "./data.json";
import {useGlobalQueryParamsStore} from '@/store/modules/globalQueryParamsStore/globalQueryParamsStore'
export const handleAlarmTrend =async (targetComponent: CreateComponentType) => {
  console.log(targetComponent.commonData,'targetComponent.commonData');
const globalQueryParamsStore = useGlobalQueryParamsStore()
  
  const obj = targetComponent.commonData[targetComponent.commonData.currentSource] as AlarmTrendType
  let { enable,  signal_ids,alarmConfirmStatus,alarmRecoveryStatus,level} = obj
  if(!enable) return {
    errcode: ResultErrcode.SUCCESS,
    data: { ...dataJson },
    errmsg: ''
  }
  const queryParams = {
    signal_ids:signal_ids.length?signal_ids.split(','):[],
    alarmConfirmStatus,
    alarmRecoveryStatus,
    level
  }

 const res = await publicInterface('/dcim/dems/devie_history_alarm', 'trend_chart', queryParams)
    if (res && res.data) {
    console.log(res,'res_handleAlarmTrend');
    // res.data = {
    //   //  dimensions: res?.data.brand_count.map((item: {})=>Object.keys(item).join('')),
    //    dimensions: ['名称','温度值'],
    //    source:res?.data.map((item: any)=>{
    //     return {
    //       '名称':`${item.node_name}-${item.dems_device_point.node_name}`,
    //       '温度值':item.dems_device_point.node_value,
    //     }
    //    })
    //   }
      return res
    }
}
