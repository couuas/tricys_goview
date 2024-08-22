import moment from "moment";
import { publicInterface } from "@/api/path";
import { DateTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { commonDataType, CategoryBrandCountTableType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from '@/enums/httpEnum'
import dataJson from './data.json'
import {useGlobalQueryParamsStore} from '@/store/modules/globalQueryParamsStore/globalQueryParamsStore'
export const handleCategoryBrandCountTable =async (targetComponent: CreateComponentType) => {
    let { currentSource, enable } = (targetComponent.commonData as commonDataType).categoryBrandCountTable as CategoryBrandCountTableType
    if(!enable) return {
        errcode: ResultErrcode.SUCCESS,
        data: { ...dataJson },
        errmsg: ''
    }
const globalQueryParamsStore = useGlobalQueryParamsStore()

    console.log(currentSource,'currentSource');
    const queryParams = {
             ...globalQueryParamsStore.getGlobalQueryParams
    }
    const res = await publicInterface(currentSource==='IT'?'/dcim/asset':'/dcim/dems/device',currentSource==='IT'?'get_category_brand_count': 'get_dev_category_brand_count', queryParams)
    const top = ['TOP1','TOP2','TOP3']
    
    res!.data = {
         dimensions: ['分类名',...top],
         source:res?.data.map((item: any)=>{
        let obj:any = {'分类名':item.name,}
item.brand.forEach((v:any,index:number)=>{
            obj[top[index]] = v.Brand
        })

        
          return obj
         })
         
        }
    return res
}
