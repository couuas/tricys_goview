import { getSessionStorage, fetchRouteParamsLocation, httpErrorHandle, JSONParse } from '@/utils'
import { ResultEnum } from '@/enums/httpEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'
import { fetchProjectApi } from '@/api/path'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import {defaultTheme, globalThemeJson} from "@/settings/chartThemes";
import {previewScaleType, requestInterval, requestIntervalUnit} from "@/settings/designSetting";

const chartEditStore = useChartEditStore()

export interface ChartEditStorageType extends ChartEditStorage {
  id: string
}

// 根据路由 id 获取存储数据的信息
export const getSessionStorageInfo = async () => {
  const id = Number(fetchRouteParamsLocation())
  if(isNaN(id)) {
    chartEditStore.editCanvasConfig = {
      // 项目名称
      projectName: undefined,
      // 默认宽度
      width: 1920,
      // 默认高度
      height: 1080,
      // 启用滤镜
      filterShow: false,
      // 色相
      hueRotate: 0,
      // 饱和度
      saturate: 1,
      // 对比度
      contrast: 1,
      // 亮度
      brightness: 1,
      // 透明度
      opacity: 1,
      // 变换（暂不更改）
      rotateZ: 0,
      rotateX: 0,
      rotateY: 0,
      skewX: 0,
      skewY: 0,
      // 混合模式
      blendMode: 'normal',
      // 默认背景色
      background: undefined,
      backgroundImage: undefined,
      // 是否使用纯颜色
      selectColor: true,
      // chart 主题色
      chartThemeColor: defaultTheme || 'dark',
      // 自定义颜色列表
      chartCustomThemeColorInfo: undefined,
      // 全局配置
      chartThemeSetting: globalThemeJson,
      // 适配方式
      previewScaleType: previewScaleType
    }
    chartEditStore.requestGlobalConfig = {
      requestDataPond: [],
      requestOriginUrl: '',
      requestInterval: requestInterval,
      requestIntervalUnit: requestIntervalUnit,
      requestParams: {
        Body: {
          'form-data': {},
          'x-www-form-urlencoded': {},
          json: '',
          xml: ''
        },
        Header: {},
        Params: {}
      }
    }
    chartEditStore.componentList = []
    return
  }
  const storageList: ChartEditStorageType[] = getSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST)

  // 是否本地预览
  if (!storageList || storageList.findIndex(e => e.id === id.toString()) === -1) {
    // 接口调用
    const res = await fetchProjectApi({ id })
    if (res) {
      const { content, state } = res.data
      // if (state === -1) {
      //   // 跳转未发布页
      //   return { isRelease: false }
      // }
      const parseData = { ...JSONParse(content ? content : '{}'), id }
      const { editCanvasConfig, requestGlobalConfig, componentList } = parseData
      chartEditStore.editCanvasConfig = editCanvasConfig
      chartEditStore.requestGlobalConfig = requestGlobalConfig
      chartEditStore.componentList = componentList
      return parseData
    } else {
      httpErrorHandle()
    }
  } else {
    // 本地读取
    for (let i = 0; i < storageList.length; i++) {
      if (id.toString() === storageList[i]['id']) {
        const { editCanvasConfig, requestGlobalConfig, componentList } = storageList[i]
        chartEditStore.editCanvasConfig = editCanvasConfig
        chartEditStore.requestGlobalConfig = requestGlobalConfig
        chartEditStore.componentList = componentList
        return storageList[i]
      }
    }
  }
}
