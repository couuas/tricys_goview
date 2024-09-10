<template>
  <div
    class="chart-item"
    :id="item.id"
    v-for="(item, index) in chartEditStore.componentList"
    :class="animationsClass(item.styles.animations)"
    :key="item.id"
    :style="{
      ...getComponentAttrStyle(item.attr, index),
      ...getTransformStyle(item.styles),
      ...getStatusStyle(item.status),
      ...getPreviewConfigStyle(item.preview),
      ...getBlendModeStyle(item.styles) as any,
      ...getSizeStyle(item.attr),
      zIndex: zIndexMap[item.id] ? zIndexMap[item.id] : '',
      ...fullScreenStyle,
    }"
  >
    <!-- 分组 -->
    <preview-render-group
      v-if="item.isGroup"
      :groupData="(item as CreateComponentGroupType)"
      :groupIndex="index"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
      @changeZIndex="(z:any) => changeZIndex(item.id, z)"
      @fullScreen="fullScreen"
    ></preview-render-group>

    <!-- 单组件 -->
    <component
      v-else
      :is="item.chartConfig.chartKey"
      :id="item.id"
      :chartConfig="item"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
      :style="{
        ...getSizeStyle(item.attr),
        ...getFilterStyle(item.styles),
        overflow: 'hidden'
      }"
      v-on="bindEvent(item)"
      @changeZIndex="(z: number | string | undefined) => changeZIndex(item.id, z)"
      @fullScreen="fullScreen"
    ></component>
<!--    v-on="useLifeHandler(item)"-->
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { useChartDataPondFetch } from '@/hooks'
import { ChartEditStorageType } from '../../index.d'
import { PreviewRenderGroup } from '../PreviewRenderGroup/index'
import { CreateComponentGroupType } from '@/packages/index.d'
import { chartColors } from '@/settings/chartThemes/index'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle, colorCustomMerge } from '@/utils'
import { getSizeStyle, getComponentAttrStyle, getStatusStyle, getPreviewConfigStyle } from '../../utils'
import { useLifeHandler } from '@/hooks'
import { useCustomEvent } from '../../hooks/useCustomEvent.hook'

// 初始化数据池
const { initDataPond, clearMittDataPondMap } = useChartDataPondFetch()
const chartEditStore = useChartEditStore()

// const props = defineProps({
//   localStorageInfo: {
//     type: Object as PropType<ChartEditStorageType>,
//     required: true
//   }
// })

// 主题色
const themeSetting = computed(() => {
  const chartThemeSetting = chartEditStore.editCanvasConfig.chartThemeSetting
  return chartThemeSetting
})

// 配置项
const themeColor = computed(() => {
  const colorCustomMergeData = colorCustomMerge(chartEditStore.editCanvasConfig.chartCustomThemeColorInfo)
  return colorCustomMergeData[chartEditStore.editCanvasConfig.chartThemeColor]
})

// 设置zindex
const zIndexMap: Ref<{ [k: string] : number | string | undefined }> = ref({})
const changeZIndex = (id: string, z: number | string | undefined) => {
  zIndexMap.value[id] = z
}

let ifFullScreen = ref(false)
let fullScreenStyle = ref({})
// 全屏功能 iframe网页组件有用到
const fullScreen = () => {
  if(!ifFullScreen.value) {
    ifFullScreen.value = true
    fullScreenStyle.value = {
      left: 0,
      top: 0,
      width: '100%',
      height: '100%'
    }
  }
  else {
    ifFullScreen.value = false
    fullScreenStyle.value = {}
  }
}

// 组件渲染结束初始化数据池
clearMittDataPondMap()
onMounted(() => {
  initDataPond(useChartEditStore)
})

const { bindEvent } = useCustomEvent()
</script>

<style lang="scss" scoped>
.chart-item {
  position: absolute;
}
</style>
