import cloneDeep from 'lodash/cloneDeep'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import { AirConditioningTableConfig } from './index'

export const customData = {
  ids: [] as string[],
  showInterval: true
}

export const option = {
  // dataset: { dimensions: [], source: [] },
  // 展示列
  header: {
    columns: [
      {key: 'node_name', reg: '', title: '设备名', unit: '', show: true, width: 'auto', align: 'left', ellipsis: true},
      {key: 'col1', reg: '/功率/', title: '空调功率', unit: 'kW', show: true, width: 'auto', align: 'left', ellipsis: true},
      {key: 'col2', reg: '/用电量/', title: '用电量', unit: 'kWh', show: true, width: 'auto', align: 'left', ellipsis: true},
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
