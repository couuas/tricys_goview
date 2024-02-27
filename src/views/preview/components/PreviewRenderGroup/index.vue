<template>
  <div
    :class="animationsClass(groupData.styles.animations)"
    :style="{
      ...getSizeStyle(groupData.attr),
      ...getFilterStyle(groupData.styles),
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
      zIndex: zIndexMap[item.id] ? zIndexMap[item.id] : ''
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
          ...getTransformStyle(item.styles)
        }"
        v-on="useLifeHandler(item)"
        @changeZIndex="z => changeZIndex(item.id, z)"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType, ref, Ref} from 'vue'
import { CreateComponentGroupType } from '@/packages/index.d'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle } from '@/utils'
import { getSizeStyle, getComponentAttrStyle, getStatusStyle, getPreviewConfigStyle } from '../../utils'
import { useLifeHandler } from '@/hooks'

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

const emit = defineEmits(['changeZIndex'])
// 设置zindex
const zIndexMap: Ref<{ [k: string] : number | string | undefined }> = ref({})

const changeZIndex = (id: string, z: number | string | undefined) => {
  zIndexMap.value[id] = z
  emit('changeZIndex', z)
}
</script>

<style lang="scss" scoped>
.chart-item {
  position: absolute;
}
</style>
