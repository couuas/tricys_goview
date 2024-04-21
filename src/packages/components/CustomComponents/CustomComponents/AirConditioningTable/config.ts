import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { AirConditioningTableConfig } from './index'

export type CustomDataType = {
  enable: boolean
  ids: string[]
  showInterval: boolean
  [key: string]: boolean | string | string[]
}

export const customData: CustomDataType = {
  enable: false,
  ids: [] as string[],
  col1Title: '设备名',
  col2Code: '',
  col2Title: '空调功率',
  col3Code: '',
  col3Title: '用电量',
  showInterval: true
}

export const option = {
  // dataset: { dimensions: [], source: [] },
  // 展示列
  header: {
    columns: [
      {key: 'col1', title: '设备名', unit: '', show: true, width: 'auto', align: 'left', ellipsis: true},
      {key: 'col2', title: '空调功率', unit: 'kW', show: true, width: 'auto', align: 'left', ellipsis: true},
      {key: 'col3', title: '用电量', unit: 'kWh', show: true, width: 'auto', align: 'left', ellipsis: true},
    ],
    // value: [],
    // options: [],
    // map: {},
  },
  pagination: {
    show: false,
    page: 1,
    pageSize: 5
  },
  // align: 'center',
  style: {
    border: 'off',
    singleColumn: 'off',
    singleLine: 'off',
    bottomBordered: 'off',
    striped: 'on',
    lineHeight: 50,
    fontSize: 16,
    borderWidth: 0,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'solid'
  },
  inputShow: 'none'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = AirConditioningTableConfig.key
  public attr = { ...chartInitConfig, w: 600, h: 300, zIndex: -1 }
  public chartConfig = cloneDeep(AirConditioningTableConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep(customData)
}
