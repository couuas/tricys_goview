import { getUUID } from '@/utils'
import { RequestConfigType, commonDataType, CustomEventType, CurrentSourceEnum, DateTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { groupTitle } from '@/settings/designSetting'
import { BaseEvent, EventLife } from '@/enums/eventEnum'
import dataJson from '@/hooks/commonDataComponents/data.json'
import singleDataJson from '@/hooks/commonDataComponents/singleData.json'

import {
  RequestHttpEnum,
  RequestDataTypeEnum,
  RequestHttpIntervalEnum,
  RequestContentTypeEnum,
  RequestBodyEnum
} from '@/enums/httpEnum'
import {
  ChartFrameEnum,
  PublicConfigType,
  PublicConfigAttrType,
  CreateComponentType,
  CreateComponentGroupType
} from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

// 请求基础属性
export const requestConfig: RequestConfigType = {
  requestDataType: RequestDataTypeEnum.STATIC,
  requestHttpType: RequestHttpEnum.GET,
  requestUrl: '',
  requestInterval: 15,
  requestIntervalUnit: RequestHttpIntervalEnum.SECOND,
  requestContentType: RequestContentTypeEnum.DEFAULT,
  requestParamsBodyType: RequestBodyEnum.NONE,
  requestSQLContent: {
    sql: 'select * from  where'
  },
  requestParams: {
    Body: {
      'form-data': {},
      'x-www-form-urlencoded': {},
      json: '',
      xml: ''
    },
    Header: {},
    Params: {}
  },
  requestBodyJSONPre: {
    enable: false,
    handler: ''
  }
}

const commonData: commonDataType = {
  currentSource: CurrentSourceEnum.POINTHISTORY,
  dataLength: null,
  pointHistory: {
    enable: false,
    methods: [],
    dems_device_points_uid: [],
    dateType: DateTypeEnum.DAY
  },
  energyUseHistory: {
    enable: false,
    strategy_ids: [],
    dateType: DateTypeEnum.DAY
  },
  recordValueHistory: {
    enable: false,
    policy: [],
    strategy_ids: [],
    dateType: DateTypeEnum.DAY
  },
  pointRealTime: {
    enable: false,
    point_uid: [],
    limit: 10,
    with_device_name: false,
    space_complete_name_prefix: false,
  },
  monthAlarmClass: {
    enable: false,
    confirm_statuses: ['ok', 'not'],
    recovery_statuses: ['ok', 'not'],
    levels: [1, 2, 3, 4],
    space_complete_id: ''
  },
  deviceClass: {
    enable: false,
    space_complete_id: ''
  },
  assetsClass: {
    enable: false,
    dataSource: ''
  },
  pointTable: {
    enable: false,
    ids: []
  },
  categoryBrandCountTable: {
    enable: false,
    currentSource:'',
  },
  singlePoint: {
    enable: false,
    pointId: '',
    result: {
      name: '',
      status: null,
      time: '',
      unit: '',
      value: 0
    }
  },
  manualInput: {
    enable: false,
    dataset: {...dataJson}
  },
  manualInputSingle: {
    enable: false,
    result: {...singleDataJson}
  }
}

const customEvent: CustomEventType = {
  click: {
    linkHead: 'http://',
    link: '',
    isBlank: false
  }
}

// 单实例类
export class PublicConfigClass implements PublicConfigType {
  public id = getUUID()
  public isGroup = false
  // 基本信息
  public attr = { ...chartInitConfig, zIndex: -1 } as PublicConfigAttrType
  // 基本样式
  public styles = {
    // 使用滤镜
    filterShow: false,
    // 色相
    hueRotate: 0,
    // 饱和度
    saturate: 1,
    // 对比度
    contrast: 1,
    // 亮度
    brightness: 1,
    // 透明
    opacity: 1,

    // 旋转
    rotateZ: 0,
    rotateX: 0,
    rotateY: 0,

    // 倾斜
    skewX: 0,
    skewY: 0,

    // 混合模式
    blendMode: 'normal',

    // 动画
    animations: []
  }
  // 预览
  public preview = {
    overFlowHidden: false
  }
  // 状态
  public status = {
    lock: false,
    hide: false
  }
  // 请求
  public request = cloneDeep(requestConfig)
  // 数据过滤
  public filter: undefined | string = undefined
  // 通用数据 与 自定义数据对应
  public commonData = cloneDeep(commonData)
  // 自定义数据 configData组件会用到
  public customData = {}
  // 自定义事件
  public customEvent = cloneDeep(customEvent)
  // 事件 不用了
  public events = {
    baseEvent: {
      [BaseEvent.ON_CLICK]: undefined,
      [BaseEvent.ON_DBL_CLICK]: undefined,
      [BaseEvent.ON_MOUSE_ENTER]: undefined,
      [BaseEvent.ON_MOUSE_LEAVE]: undefined
    },
    advancedEvents: {
      [EventLife.VNODE_MOUNTED]: undefined,
      [EventLife.VNODE_BEFORE_MOUNT]: undefined
    },
    interactEvents: []
  }
}

// 多选成组类
export class PublicGroupConfigClass extends PublicConfigClass implements CreateComponentGroupType {
  // 成组
  public isGroup = true
  // 名称
  public chartConfig = {
    key: 'group',
    chartKey: 'group',
    conKey: 'group',
    category: 'group',
    categoryName: 'group',
    package: 'group',
    chartFrame: ChartFrameEnum.COMMON,
    title: groupTitle,
    image: ''
  }
  // 组成员列表
  public groupList: Array<CreateComponentType> = []
  // ---- 原有 ---
  // key
  public key = 'group'
  // 配置
  public option = {}
  // 标识
  public id = getUUID()
  // 基本信息
  public attr = { w: 0, h: 0, x: 0, y: 0, offsetX: 0, offsetY: 0, zIndex: -1 }
}
