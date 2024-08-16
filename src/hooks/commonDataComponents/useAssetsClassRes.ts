import { publicInterface } from "@/api/path";
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import { AssetsClassType } from '@/store/modules/chartEditStore/chartEditStore.d'
import dataJson from "./data.json";
import { Product } from "@vicons/carbon";

export const handleAssetsClass =async (targetComponent: CreateComponentType) => {
  const obj = targetComponent.commonData[targetComponent.commonData.currentSource] as AssetsClassType
  let { enable, dataSource } = obj
  console.log(enable, dataSource,'handleAssetsClass')
  if(!enable) return {
    errcode: ResultErrcode.SUCCESS,
    data: { ...dataJson },
    errmsg: ''
  }
  const query = {
    
  }
  // 处理数据
  if(dataSource==='IT'){
    
    const res  = await publicInterface('/dcim/asset','get_asset_overview_page_info_new', query)
    res!.data = {
    //  dimensions: res?.data.brand_count.map((item: {})=>Object.keys(item).join('')),
     dimensions: ['product','data'],
     source:res?.data.brand_count.slice(0,8).map((item: {})=>{
      return {
        product:Object.keys(item)[0],
        data:Object.values(item)[0],
      }
     })
    }
    return res
  }else{
    const res  = await  publicInterface('/dcim/dems/device','get_dev_brand_count', query)
    res!.data = {
      //  dimensions: res?.data.brand_count.map((item: {})=>Object.keys(item).join('')),
       dimensions: ['品牌','data'],
       source:res?.data.slice(0,8).map((item: any)=>{
        return {
          '品牌':item.name,
          data:item.count,
        }
       })
      }
      return res
  }
}
