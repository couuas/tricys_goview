import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TableScrollBoardConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export enum AlignEnum {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export type MapType = {
  show: boolean
  key: string
  header: string
  align: AlignEnum
  columnWidth: number
}

export const option = {
  headerConfig: [],
  headerConfigMap: {
    index: {
      show: true,
      key: '行号',
      header: '#',
      align: 'left',
      columnWidth: 30,
    }
  },
  // header: ['列1', '列2', '列3'],
  dataset: { dimensions: [], source: [] },
  // index: true,
  // columnWidth: [],
  // align: [],
  rowNum: 5,
  waitTime: 2,
  headerHeight: null,
  carousel: 'single',
  headerBGC: '#00BAFF',
  oddRowBGC: '#003B51',
  evenRowBGC: '#0A2732'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TableScrollBoardConfig.key
  public chartConfig = cloneDeep(TableScrollBoardConfig)
  public option = cloneDeep(option)
}
