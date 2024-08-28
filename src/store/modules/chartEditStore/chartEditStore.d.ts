import { CreateComponentType, CreateComponentGroupType, FilterEnum } from '@/packages/index.d'
import { HistoryActionTypeEnum } from '@/store/modules/chartHistoryStore/chartHistoryStore.d'
import { SyncEnum } from '@/enums/editPageEnum'
import {
  RequestHttpEnum,
  RequestContentTypeEnum,
  RequestDataTypeEnum,
  RequestHttpIntervalEnum,
  RequestParams,
  RequestBodyEnum,
  RequestParamsObjType
} from '@/enums/httpEnum'
import { PreviewScaleEnum } from '@/enums/styleEnum'
import type { ChartColorsNameType, CustomColorsType, GlobalThemeJsonType } from '@/settings/chartThemes/index'

// 项目数据枚举
export enum ProjectInfoEnum {
  // ID
  PROJECT_ID = "projectId",
  // 名称
  PROJECT_NAME = 'projectName',
  // 描述
  REMARKS = 'remarks',
  // 缩略图
  THUMBNAIL= 'thumbnail',
  // 是否公开发布
  RELEASE = 'release'
}

// 项目数据
export type ProjectInfoType = {
  [ProjectInfoEnum.PROJECT_ID]: string,
  [ProjectInfoEnum.PROJECT_NAME]: string,
  [ProjectInfoEnum.REMARKS]: string,
  [ProjectInfoEnum.THUMBNAIL]: string,
  [ProjectInfoEnum.RELEASE]: boolean
}

// 编辑画布属性
export enum EditCanvasTypeEnum {
  EDIT_LAYOUT_DOM = 'editLayoutDom',
  EDIT_CONTENT_DOM = 'editContentDom',
  OFFSET = 'offset',
  SCALE = 'scale',
  USER_SCALE = 'userScale',
  LOCK_SCALE = 'lockScale',
  SAVE_STATUS = 'saveStatus',
  IS_CREATE = 'isCreate',
  IS_DRAG = 'isDrag',
  IS_SELECT = 'isSelect',
  IS_CODE_EDIT="isCodeEdit"
}

// 编辑区域（临时）
export type EditCanvasType = {
  // 编辑区域 DOM
  [EditCanvasTypeEnum.EDIT_LAYOUT_DOM]: HTMLElement | null
  [EditCanvasTypeEnum.EDIT_CONTENT_DOM]: HTMLElement | null
  // 偏移大小
  [EditCanvasTypeEnum.OFFSET]: number
  // 缩放
  [EditCanvasTypeEnum.SCALE]: number
  // 缩放
  [EditCanvasTypeEnum.USER_SCALE]: number
  // 锁定缩放
  [EditCanvasTypeEnum.LOCK_SCALE]: boolean
  // 初始化创建
  [EditCanvasTypeEnum.IS_CREATE]: boolean
  // 拖拽中
  [EditCanvasTypeEnum.IS_DRAG]: boolean
  // 保存状态
  [EditCanvasTypeEnum.SAVE_STATUS]: SyncEnum
  // 框选中
  [EditCanvasTypeEnum.IS_SELECT]: boolean
  // 代码编辑中
  [EditCanvasTypeEnum.IS_CODE_EDIT]: boolean
}

// 画布数据/滤镜/背景色/宽高主题等
export enum EditCanvasConfigEnum {
  PROJECT_NAME = 'projectName',
  WIDTH = 'width',
  HEIGHT = 'height',
  CHART_THEME_COLOR = 'chartThemeColor',
  CHART_CUSTOM_THEME_COLOR_INFO = 'chartCustomThemeColorInfo',
  CHART_THEME_SETTING = 'chartThemeSetting',
  BACKGROUND = 'background',
  BACKGROUND_IMAGE = 'backgroundImage',
  SELECT_COLOR = 'selectColor',
  PREVIEW_SCALE_TYPE = 'previewScaleType'
}

// 画布属性（需保存）
export type EditCanvasConfigType = {
  // ID
  [EditCanvasConfigEnum.PROJECT_ID]: string,
  // 项目名称
  [EditCanvasConfigEnum.PROJECT_NAME]?: string,
  // 项目描述
  [EditCanvasConfigEnum.REMARKS]: string,
  // 滤镜-启用
  [FilterEnum.FILTERS_SHOW]: boolean
  // 滤镜-色相
  [FilterEnum.HUE_ROTATE]: number
  // 滤镜-饱和度
  [FilterEnum.SATURATE]: number
  // 滤镜-亮度
  [FilterEnum.BRIGHTNESS]: number
  // 滤镜-对比度
  [FilterEnum.CONTRAST]: number
  // 滤镜-不透明度
  [FilterEnum.OPACITY]: number
  // 变换（暂不使用）
  [FilterEnum.ROTATE_Z]: number
  [FilterEnum.ROTATE_X]: number
  [FilterEnum.ROTATE_Y]: number
  [FilterEnum.SKEW_X]: number
  [FilterEnum.SKEW_Y]: number
  [FilterEnum.BLEND_MODE]: string
  // 大屏名称
  [EditCanvasConfigEnum.PROJECT_NAME]?: string
  // 大屏宽度
  [EditCanvasConfigEnum.WIDTH]: number
  // 大屏高度
  [EditCanvasConfigEnum.HEIGHT]: number
  // 背景色
  [EditCanvasConfigEnum.BACKGROUND]?: string
  // 背景图片
  [EditCanvasConfigEnum.BACKGROUND_IMAGE]?: string | null
  // 图表主题颜色
  [EditCanvasConfigEnum.CHART_THEME_COLOR]: ChartColorsNameType
  // 自定义图表主题颜色
  [EditCanvasConfigEnum.CHART_CUSTOM_THEME_COLOR_INFO]?: CustomColorsType[]
  // 图表全局配置
  [EditCanvasConfigEnum.CHART_THEME_SETTING]: GlobalThemeJsonType
  // 图表主题颜色
  [EditCanvasConfigEnum.SELECT_COLOR]: boolean
  // 预览展示方式
  [EditCanvasConfigEnum.PREVIEW_SCALE_TYPE]: PreviewScaleEnum
}

// 坐标轴信息
// eslint-disable-next-line no-redeclare
export enum EditCanvasTypeEnum {
  START_X = 'startX',
  START_Y = 'startY',
  X = 'x',
  Y = 'y'
}

// 鼠标位置
export type MousePositionType = {
  // 开始 X
  [EditCanvasTypeEnum.START_X]: number
  // 开始 Y
  [EditCanvasTypeEnum.START_Y]: number
  // X
  [EditCanvasTypeEnum.X]: number
  // y
  [EditCanvasTypeEnum.Y]: number
}

// 操作目标
export type TargetChartType = {
  hoverId?: string
  selectId: string[]
}

// 数据记录
export type RecordChartType = {
  charts: CreateComponentType | CreateComponentGroupType | Array<CreateComponentType | CreateComponentGroupType>
  type: HistoryActionTypeEnum.CUT | HistoryActionTypeEnum.COPY
}

// Store 枚举
export enum ChartEditStoreEnum {
  PROJECT_INFO = 'projectInfo',
  EDIT_RANGE = 'editRange',
  EDIT_CANVAS = 'editCanvas',
  RIGHT_MENU_SHOW = 'rightMenuShow',
  MOUSE_POSITION = 'mousePosition',
  TARGET_CHART = 'targetChart',
  RECORD_CHART = 'recordChart',
  // 以下需要存储
  EDIT_CANVAS_CONFIG = 'editCanvasConfig',
  REQUEST_GLOBAL_CONFIG = 'requestGlobalConfig',
  COMPONENT_LIST = 'componentList'
}

// 请求公共类型
type RequestPublicConfigType = {
  // 时间单位（时分秒）
  requestIntervalUnit: RequestHttpIntervalEnum
  // 请求内容
  requestParams: RequestParams
}

// 数据池项类型
export type RequestDataPondItemType = {
  dataPondId: string,
  dataPondName: string,
  dataPondRequestConfig: RequestConfigType
}

// 全局的图表请求配置
export interface RequestGlobalConfigType extends RequestPublicConfigType {
  // 组件定制轮询时间
  requestInterval: number
  // 请求源地址
  requestOriginUrl?: string
  // 公共数据池
  requestDataPond: RequestDataPondItemType[]
}

// 单个图表请求配置
export interface RequestConfigType extends RequestPublicConfigType {
  // 是否立即执行
  immediate?:boolean
  // 所选全局数据池的对应 id
  requestDataPondId?: string
  // 组件定制轮询时间
  requestInterval?: number
  // 获取数据的方式
  requestDataType: RequestDataTypeEnum
  // 请求方式 get/post/del/put/patch
  requestHttpType: RequestHttpEnum
  // 源后续的 url
  requestUrl?: string
  // 请求内容主体方式 普通/sql
  requestContentType: RequestContentTypeEnum
  // 请求体类型
  requestParamsBodyType: RequestBodyEnum
  // SQL 请求对象
  requestSQLContent: {
    sql: string
  }
  requestBodyJSONPre: {
    enable: boolean
    handler: string
  }
}

export enum MethodsTypeEnum {
  AVG = 'avg',
  MIN = 'min',
  MAX = 'max'
}

export enum DateTypeEnum {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year'
}

// common数据源选项
export enum CurrentSourceEnum {
  // 测点历史
  POINTHISTORY = 'pointHistory',
  // 能耗历史
  ENERGYUSEHISTORY = 'energyUseHistory',
  // 记录值历史
  RECORDVALUEHISTORY = 'recordValueHistory',
  // 测点实时值
  POINTREALTIME = 'pointRealTime',
  // 单测点实时值
  SINGLEPOINT = 'singlePoint',
  // 设备分类统计
  DEVICECLASS = 'deviceClass',
  // 设备分类统计
  ASSETSCLASS = 'assetsClass',
  // 局房温度Top10
  COMPANYTEMPTOP = 'companyTempTop',
  // 局房温度Top10
  ALARMTREND = 'alarmTrend',
  // 区域设备个数
  AREADEVCOUNT = 'areaDevCount',
  // 当月告警分类统计
  MONTHALARMCLASS = 'monthAlarmClass',
  // 测点表格
  POINTTABLE = 'pointTable',
  // 测点表格
  CATEGORYBRANDCOUNTTABLE = 'categoryBrandCountTable',
  // 手动输入
  MANUALINPUT = 'manualInput',
  // 手动输入(单值)
  MANUALINPUTSINGLE = 'manualInputSingle',
}

// 测点历史参数
export interface PointHistoryType {
  enable: boolean
  methods: MethodsTypeEnum[]
  dems_device_points_uid: string[]
  dateType: DateTypeEnum
}

// 能耗历史参数
export interface EnergyUseHistoryType {
  enable: boolean
  strategy_ids: (number | null)[]
  dateType: DateTypeEnum
}

export enum PolicyTypeEnum {
  AVG = 3,
  MIN = 0,
  MAX = 1
}

// 记录值历史参数
export interface RecordValueHistoryType {
  enable: boolean
  policy: PolicyTypeEnum[]
  strategy_ids: (number | null)[]
  dateType: DateTypeEnum
}

// 测点实时值参数
export interface PointRealTimeType {
  enable: boolean
  point_uid: string[]
  limit: number
  with_device_name: boolean
  space_complete_name_prefix: boolean
}

export interface resultType {
  name: string
  status: number | null
  time: string
  unit: string
  value: number | null
}

// 单测点实时值
export interface SinglePointType {
  enable: boolean
  pointId: string
  result: resultType
}

// 设备分类统计 无参数类型
export interface NoParamsType {
  enable: boolean
}

// 当月告警分类统计
export interface MonthAlarmClassType {
  enable: boolean
  confirm_statuses: string[]
  recovery_statuses: string[]
  levels: number[]
  space_complete_id: string
}

// 设备分类统计
export interface DeviceClassType {
  enable: boolean
  space_complete_id: string
}
// 统计
export interface AssetsClassType {
  enable: boolean
  dataSource: string
}
// 局房温度Top10
export interface CompanyTempTopType {
  enable: boolean
  space_complete_id: string,
  signal_ids:string

}
// 告警趋势
export interface AlarmTrendType {
  enable: boolean
  signal_ids:string
  alarmConfirmStatus:string[]
  alarmRecoveryStatus:string[]
  level:number[]

}
export interface AreaDevCountType {
  enable: boolean
  dataSource: string
  space_complete_id:string
}

// 测点表格值
export interface PointTableType {
  enable: boolean
  ids: string[]
}
export interface CategoryBrandCountTableType {
  enable: boolean
  currentSource: string
}

// 手动输入值
export interface ManualInputType {
  enable: boolean
  dataset: {
    dimensions: string[],
    source: {
      [k: string]: any
    }
  }
}

// 手动输入值(单值)
export interface ManualInputSingleType {
  enable: boolean
  result: resultType
}

// 通用组件数据
export interface commonDataType {
  // 多数据
  currentSource: CurrentSourceEnum
  // 公共接口参数
  queryParams:any
  dataLength: number | null
  pointHistory: PointHistoryType
  energyUseHistory: EnergyUseHistoryType
  recordValueHistory: RecordValueHistoryType
  pointRealTime: PointRealTimeType
  monthAlarmClass: MonthAlarmClassType
  pointTable: PointTableType
  categoryBrandCountTable: CategoryBrandCountTableType
  // 多数据无参数
  // 设备分类统计
  deviceClass: DeviceClassType
  assetsClass: AssetsClassType
  companyTempTop: CompanyTempTopType
  alarmTrend: AlarmTrendType
  areaDevCount: AreaDevCountType
  // 单数据
  singlePoint: SinglePointType
  // 手动输入
  manualInput: ManualInputType
  // 手动输入(单值)
  manualInputSingle: ManualInputSingleType
}

// customEvent事件
export interface CustomEventType {
  click: {
    linkHead: 'http://' | 'https://'
    link: string
    isBlank: boolean
  }
}

// Store 类型
export interface ChartEditStoreType {
  [ChartEditStoreEnum.PROJECT_INFO]: ProjectInfoType
  [ChartEditStoreEnum.EDIT_CANVAS]: EditCanvasType
  [ChartEditStoreEnum.EDIT_CANVAS_CONFIG]: EditCanvasConfigType
  [ChartEditStoreEnum.RIGHT_MENU_SHOW]: boolean
  [ChartEditStoreEnum.MOUSE_POSITION]: MousePositionType
  [ChartEditStoreEnum.TARGET_CHART]: TargetChartType
  [ChartEditStoreEnum.RECORD_CHART]?: RecordChartType
  [ChartEditStoreEnum.REQUEST_GLOBAL_CONFIG]: RequestGlobalConfigType
  [ChartEditStoreEnum.COMPONENT_LIST]: Array<CreateComponentType | CreateComponentGroupType>
}

// 存储数据类型
export interface ChartEditStorage {
  [ChartEditStoreEnum.EDIT_CANVAS_CONFIG]: EditCanvasConfigType
  [ChartEditStoreEnum.REQUEST_GLOBAL_CONFIG]: RequestGlobalConfigType
  [ChartEditStoreEnum.COMPONENT_LIST]: Array<CreateComponentType | CreateComponentGroupType>
}
