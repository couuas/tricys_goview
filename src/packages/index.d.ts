import type { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import type { RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { EventType } from '@/enums/eventEnum';


export enum ChartFrameEnum {
  // echarts 框架
  ECHARTS = 'echarts',
  // UI 组件框架
  NAIVE_UI = 'naiveUI',
  // 自定义带数据组件
  COMMON = 'common',
  // 无数据变更
  STATIC = 'static'
}

export type OptionsType = {
  label: string
  value: string
  [key: string]: string
}

// 组件配置
export type ConfigType = {
  id?: string
  key: string
  chartKey: string
  conKey: string
  title: string
  category: string
  categoryName: string
  package: string
  chartFrame?: ChartFrameEnum
  eventList?: Array<OptionsType>
  image: string | (() => Promise<typeof import('*.png')>)
}


export type EventList = Array<{
  name: string,
  event: string,
  type: string,
  code: string,
  uid: string,
  [key: string]: any
}>


export type EventConfigValue = Record<string, {
  title: string,
  eventList: EventList
}>

export type EventConfig = {
  [key: EventType]: EventConfigValue
}

// 数据请求
interface requestConfig {
  request: RequestConfigType,
}

// Echarts 数据类型
interface EchartsDataType {
  dimensions: string[],
  source: any[]
}

// 滤镜/变换枚举
export enum FilterEnum {
  // 透明度
  OPACITY = 'opacity',
  // 饱和度
  SATURATE = 'saturate',
  // 对比度
  CONTRAST = 'contrast',
  // 色相
  HUE_ROTATE = 'hueRotate',
  // 亮度
  BRIGHTNESS = 'brightness',

  // 旋转
  ROTATE_Z = 'rotateZ',
  ROTATE_X = 'rotateX',
  ROTATE_Y = 'rotateY',

  // 倾斜
  SKEW_X = 'skewX',
  SKEW_Y = 'skewY',
}

// 组件实例类
export interface PublicConfigType extends requestConfig {
  id: string
  rename?: string
  attr: { x: number; y: number; w: number; h: number; zIndex: number }
  styles: {
    [FilterEnum.OPACITY]: number;
    [FilterEnum.SATURATE]: number;
    [FilterEnum.CONTRAST]: number;
    [FilterEnum.HUE_ROTATE]: number;
    [FilterEnum.BRIGHTNESS]: number;

    [FilterEnum.ROTATE_Z]: number;
    [FilterEnum.ROTATE_X]: number;
    [FilterEnum.ROTATE_Y]: number;

    [FilterEnum.SKEW_X]: number;
    [FilterEnum.SKEW_Y]: number;
    // 动画
    animations: string[]
  }
  filter?: string
  setPosition: Function
}

export interface CreateComponentType extends PublicConfigType {
  key: string
  chartConfig: ConfigType
  option: GlobalThemeJsonType
  eventList: Array<OptionsType>
  eventConfig: EventConfig
}

// 获取组件实例类中某个key对应value类型的方法
export type PickCreateComponentType<T extends keyof CreateComponentType> = Pick<CreateComponentType, T>[T]

// 包分类枚举
export enum PackagesCategoryEnum {
  CHARTS = 'Charts',
  TABLES = 'Tables',
  INFORMATIONS = 'Informations',
  DECORATES = 'Decorates'
}

// 包分类名称
export enum PackagesCategoryName {
  CHARTS = '图表',
  TABLES = '列表',
  INFORMATIONS = '信息',
  DECORATES = '小组件'
}

// 获取组件
export enum FetchComFlagType {
  VIEW,
  CONFIG
}

// 图表包类型
export type PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ConfigType[]
  [PackagesCategoryEnum.INFORMATIONS]: ConfigType[]
  [PackagesCategoryEnum.TABLES]: ConfigType[]
  [PackagesCategoryEnum.DECORATES]: ConfigType[]
}
