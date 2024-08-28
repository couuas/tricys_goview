import { publicInterface } from "@/api/path";
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from "@/enums/httpEnum";
import { AssetsClassType } from '@/store/modules/chartEditStore/chartEditStore.d'
import dataJson from "./data.json";
import {useGlobalQueryParamsStore} from '@/store/modules/globalQueryParamsStore/globalQueryParamsStore'
export const handleAssetsClass =async (targetComponent: CreateComponentType) => {
const globalQueryParamsStore = useGlobalQueryParamsStore()

  const obj = targetComponent.commonData[targetComponent.commonData.currentSource] as AssetsClassType
  let { enable, dataSource } = obj
  if(!enable) return {
    errcode: ResultErrcode.SUCCESS,
    data: { ...dataJson },
    errmsg: ''
  }
  const query = {
    ...globalQueryParamsStore.getGlobalQueryParams
  }
  // 处理数据
  if(dataSource==='IT'){
    const res  = await publicInterface('/dcim/asset','get_asset_overview_page_info_new', query)
    res!.data = {
    //  dimensions: res?.data.brand_count.map((item: {})=>Object.keys(item).join('')),
     dimensions: ['品牌','data'],
     source:res?.data?.brand_count.slice(0,7).map((item: {})=>{
      return {
        '品牌':Object.keys(item)[0],
        data:Object.values(item)[0],
      }
     })
    }
    console.log(res,'调用了吗')

    return res
  }else{
    const res  = await  publicInterface('/dcim/dems/device','get_dev_brand_count', query)

    res!.data = {
      //  dimensions: res?.data.brand_count.map((item: {})=>Object.keys(item).join('')),
       dimensions: ['品牌','data'],
       source:res?.data.slice(0,7).map((item: any)=>{
        return {
          '品牌':item.name,
          data:item.count,
        }
       })
      }
    console.log(res,'调用了吗1')

      return res
  }
}
