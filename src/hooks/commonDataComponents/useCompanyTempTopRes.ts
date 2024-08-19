import { publicInterface } from "@/api/path";
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import { CompanyTempTopType } from '@/store/modules/chartEditStore/chartEditStore.d'
import dataJson from "./data.json";

export const handleCompanyTempTop =async (targetComponent: CreateComponentType) => {
  console.log(targetComponent.commonData,'targetComponent.commonData');
  
  const obj = targetComponent.commonData[targetComponent.commonData.currentSource] as CompanyTempTopType
  let { enable, space_complete_id, signal_ids} = obj
  if(!enable) return {
    errcode: ResultErrcode.SUCCESS,
    data: { ...dataJson },
    errmsg: ''
  }
 const res = await publicInterface('/dcim/dems/device_point', 'temp_list_dashboard', {signal_ids:[signal_ids],space_complete_id})
    if (res && res.data) {
    console.log(res,'res_handleCompanyTempTop');
    res.data = {
      //  dimensions: res?.data.brand_count.map((item: {})=>Object.keys(item).join('')),
       dimensions: ['名称','温度值'],
       source:res?.data.map((item: any)=>{
        return {
          '名称':`${item.node_name}-${item.dems_device_point.node_name}`,
          '温度值':item.dems_device_point.node_value,
        }
       })
      }
      return res
    }
}
