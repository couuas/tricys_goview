import { RequestHttpEnum, RequestHttpIntervalEnum, RequestDataTypeEnum, SelectHttpTimeNameObj } from '@/enums/httpEnum'
import { CurrentSourceEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

// 匹配结果
export enum DataResultEnum {
  NULL = 0,
  SUCCESS = 1,
  FAILURE = 2,
}

export enum TimelineTitleEnum {
  FILTER = '数据过滤',
  MAPPING = '数据映射',
  CONTENT = '数据内容',
}

export enum SelectCreateDataEnum {
  STATIC = '静态数据',
  AJAX = '动态请求',
  Pond = '公共接口',
}

export interface SelectCreateDataType {
  label: SelectCreateDataEnum
  value: RequestDataTypeEnum
  disabled?: boolean
}

// ajax 请求类型
export interface SelectHttpType {
  label: RequestHttpEnum
  value: RequestHttpEnum
  disabled?: boolean
  style?: object
}

// 类型选项
export const selectTypeOptions: SelectHttpType[] = [
  {
    label: RequestHttpEnum.GET,
    value: RequestHttpEnum.GET,
    style: {
      color: 'greenyellow',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.POST,
    value: RequestHttpEnum.POST,
    style: {
      color: 'skyblue',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.PUT,
    value: RequestHttpEnum.PUT,
    style: {
      color: 'goldenrod',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.PATCH,
    value: RequestHttpEnum.PATCH,
    style: {
      color: 'violet',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.DELETE,
    value: RequestHttpEnum.DELETE,
    disabled: true,
    style: {
      fontWeight: 'bold'
    }
  },
]

// ajax 请求间隔
export interface SelectHttpTimeType {
  label: string
  value: RequestHttpIntervalEnum
  disabled?: boolean
  unit: number
}

// 时间选项
export const selectTimeOptions: SelectHttpTimeType[] = [
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.SECOND],
    value: RequestHttpIntervalEnum.SECOND,
    unit: 1000,
  },
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.MINUTE],
    value: RequestHttpIntervalEnum.MINUTE,
    unit: 60000,
  },
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.HOUR],
    value: RequestHttpIntervalEnum.HOUR,
    unit: 3600000,
  },
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.DAY],
    value: RequestHttpIntervalEnum.DAY,
    unit: 86400000,
  },
]

export enum optionTypeEnum {
  // 多个值
  MULTIPLE = 'multiple',
  // 单个值的数据源 环形图等
  SINGLE = 'single'
}

export interface sourceOptionsItemType {
  label: string,
  value: CurrentSourceEnum,
  type: optionTypeEnum
}

// 通用组件数据源选项
export const sourceOptions: sourceOptionsItemType[] = [
  {
    label: '测点历史',
    value: CurrentSourceEnum.POINTHISTORY,
    type: optionTypeEnum.MULTIPLE,
  },
  {
    label: '能耗历史',
    value: CurrentSourceEnum.ENERGYUSEHISTORY,
    type: optionTypeEnum.MULTIPLE,
  },
  {
    label: '记录值历史',
    value: CurrentSourceEnum.RECORDVALUEHISTORY,
    type: optionTypeEnum.MULTIPLE,
  },
  {
    label: '测点实时值',
    value: CurrentSourceEnum.POINTREALTIME,
    type: optionTypeEnum.MULTIPLE,
  },
  {
    label: '设备分类统计',
    value: CurrentSourceEnum.DEVICECLASS,
    type: optionTypeEnum.MULTIPLE,
  },
  {
    label: '分类统计',
    value: CurrentSourceEnum.ASSETSCLASS,
    type: optionTypeEnum.MULTIPLE,
  },
  {
    label: '区域设备个数',
    value: CurrentSourceEnum.AREADEVCOUNT,
    type: optionTypeEnum.MULTIPLE,
  },
  {
    label: '当月告警分类统计',
    value: CurrentSourceEnum.MONTHALARMCLASS,
    type: optionTypeEnum.MULTIPLE,
  },
  {
    label: '测点表格值',
    value: CurrentSourceEnum.POINTTABLE,
    type: optionTypeEnum.MULTIPLE,
  },
  {
    label: '分类品牌表格值',
    value: CurrentSourceEnum.CATEGORYBRANDCOUNTTABLE,
    type: optionTypeEnum.MULTIPLE,
  },
  {
    label: '手动输入值',
    value: CurrentSourceEnum.MANUALINPUT,
    type: optionTypeEnum.MULTIPLE,
  },
  {
    label: '单测点实时值',
    value: CurrentSourceEnum.SINGLEPOINT,
    type: optionTypeEnum.SINGLE,
  },
  {
    label: '手动输入值(单值)',
    value: CurrentSourceEnum.MANUALINPUTSINGLE,
    type: optionTypeEnum.SINGLE,
  },
]
