import { publicInterface } from '@/api/path'
import { CreateComponentType } from '@/packages/index.d'
import { ResultErrcode } from '@/enums/httpEnum'
import { CompanyTempTopType } from '@/store/modules/chartEditStore/chartEditStore.d'
import dataJson from './data.json'

export const handleCompanyTempTop = async (targetComponent: CreateComponentType) => {
  console.log(targetComponent, 'targetComponent_targetComponent')
  const option = targetComponent.option as any
 
  const obj = targetComponent.commonData[targetComponent.commonData.currentSource] as CompanyTempTopType
  let { enable, space_complete_id, signal_ids,spaceLevel } = obj
  if (!enable)
    return {
      errcode: ResultErrcode.SUCCESS,
      data: { ...dataJson },
      errmsg: ''
    }
    option.tooltip.formatter = (value:any)=>{
      const item = value[0].data
      // 将字符串按照 '/' 分割成数组
  const parts = item.space_complete_name.split('/');
  // 从数组开头开始，截取指定层级及以后的部分
  const space_complete_name = parts.slice(spaceLevel, parts.length );
      return `
      ${space_complete_name.join('/')}/${item.device_name}</br>
      ${item['名称']}&nbsp;&nbsp;&nbsp;&nbsp;${item['温度值']}°C
      `
      
    }
  const res: any = await publicInterface('/dcim/dems/device_point', 'temp_list_dashboard', {
    signal_ids: [signal_ids],
    space_complete_id
  })

  if (res && res.data) {
  // option.yAxis[0].data = res?.data.slice(0, 10).map((item: any) => item.dems_device_point.node_value)
  // option.xAxis.data = res?.data.slice(0, 10).map((item: any) => item.node_name)

    res.data = {
      dimensions: ['uid', '温度值',],
      source: res?.data.slice(0, 10).map((item: any) => {
        return {
          uid: item.dems_device_point.uid,
          名称: `${item.dems_device_point.node_name}`,
          温度值: item.dems_device_point.node_value,
          space_complete_name:item.space_complete_name,
          device_name:item.node_name


        }
      }),
      encode: {
        x: '名称',
        y: '温度值'
      }
    }


    return res
  } else {
    // 后端没有给errcode,前端重置
    res.errcode = '00000'
    res.data = {
      dimensions: [],
      source: []
    }
    return res
  }
}
