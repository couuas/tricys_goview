import { publicInterface } from "@/api/path";
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import { AreaDevCountType } from '@/store/modules/chartEditStore/chartEditStore.d'
import dataJson from "./data.json";

export const handleAreaDevCountClass =async (targetComponent: CreateComponentType) => {
  const obj = targetComponent.commonData[targetComponent.commonData.currentSource] as AreaDevCountType
 console.log(targetComponent,'targetComponent_targetComponent');
//  targetComponent?.option.series.forEach((item,index)=>{
//   item.encode = { y:index===0? 'dev_count':'it_dev_count', x: 'space' }
//  })
 
  // 处理数据
  const res  = await publicInterface('/dcim/dems/device','get_area_dev_count', {})
  res!.data = {
  //  dimensions: res?.data.brand_count.map((item: {})=>Object.keys(item).join('')),
   dimensions: ['区域','配电设备总数','IT设备总数'],
   source:res?.data.map((item: any)=>{
    return {
      '区域':item?.space?.label,
    
      '配电设备总数':item?.dev_count,
      'IT设备总数':item?.it_dev_count,
    }
   })
  }
  return res
}
