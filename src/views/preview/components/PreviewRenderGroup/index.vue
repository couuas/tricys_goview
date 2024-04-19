<template>
  <div
    :class="animationsClass(groupData.styles.animations)"
    :style="{
      ...getSizeStyle(groupData.attr),
      ...getFilterStyle(groupData.styles),
      ...fullScreenStyle
    }"
  >
    <div
      class="chart-item"
      v-for="item in groupData.groupList"
      :class="animationsClass(item.styles.animations)"
      :key="item.id"
      :style="{
      ...getComponentAttrStyle(item.attr, groupIndex),
      ...getStatusStyle(item.status),
      ...getPreviewConfigStyle(item.preview),
      ...getBlendModeStyle(item.styles) as any,
      zIndex: zIndexMap[item.id] ? zIndexMap[item.id] : '',
      ...fullScreenStyle
    }"
    >
      <component
        :is="item.chartConfig.chartKey"
        :id="item.id"
        :chartConfig="item"
        :themeSetting="themeSetting"
        :themeColor="themeColor"
        :style="{
          ...getSizeStyle(item.attr),
          ...getFilterStyle(item.styles),
          ...getTransformStyle(item.styles),
          ...fullScreenStyle
        }"
        :isGroup="true"
        :groupAttr="groupData.attr"
        @changeZIndex="(z: number | string | undefined) => changeZIndex(item.id, z)"
        @fullScreen="fullScreen"
        v-on="bindEvent(item)"
      ></component>
<!--        v-on="useLifeHandler(item)"-->
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType, ref, Ref, onMounted} from 'vue'
import { CreateComponentGroupType } from '@/packages/index.d'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle } from '@/utils'
import { getSizeStyle, getComponentAttrStyle, getStatusStyle, getPreviewConfigStyle } from '../../utils'
import { useLifeHandler } from '@/hooks'
import { useCustomEvent } from '../../hooks/useCustomEvent.hook'

const props = defineProps({
  groupData: {
    type: Object as PropType<CreateComponentGroupType>,
    required: true
  },
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  groupIndex: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['changeZIndex', 'fullScreen'])
// 设置zindex
const zIndexMap: Ref<{ [k: string] : number | string | undefined }> = ref({})

const changeZIndex = (id: string, z: number | string | undefined) => {
  zIndexMap.value[id] = z
  emit('changeZIndex', z)
}

const fullScreen = () => {
  emit('fullScreen')
  _fullScreen()
}

let ifFullScreen = ref(false)
let fullScreenStyle = ref({})
// 全屏功能 iframe网页组件有用到
const _fullScreen = () => {
  if(!ifFullScreen.value) {
    ifFullScreen.value = true
    fullScreenStyle.value = {
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
    }
  }
  else {
    ifFullScreen.value = false
    fullScreenStyle.value = {}
  }
}
const { bindEvent } = useCustomEvent()
</script>

<style lang="scss" scoped>
.chart-item {
  position: absolute;
}
</style>
