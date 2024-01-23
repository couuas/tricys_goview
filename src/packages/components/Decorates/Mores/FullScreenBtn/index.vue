<template>
  <div
      id="fullscreenButton"
      class="full-screen-btn"
      :style="{color: color, fontSize: `${fontSize}px`, fontWeight,  border: `${border}px solid ${borderColor}`}"
      @click="toggleFullscreen"
  >
    <i class="iconfont icon-quanping full-screen" :title="showMoreMenuBts ? '全屏' : '退出全屏'"></i>
    {{ showMoreMenuBts ? '全屏' : '退出全屏' }}
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs, watch } from "vue";
import { postMessageToParent } from "@/utils";
import { isPreview } from '@/utils/router'
import { CreateComponentType } from '@/packages/index.d'
import { option } from "./config";

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})
let { color, fontSize, fontWeight, border, borderColor } = toRefs(props.chartConfig.option)

const showMoreMenuBts = ref(true)
// 切换全屏函数
function toggleFullscreen() {
  if(!isPreview()) return
  postMessageToParent({type: 'fullScreen'})
  showMoreMenuBts.value = !showMoreMenuBts.value
}
</script>

<style lang="scss" scoped>
.full-screen-btn {
  width: 100%;
  height: 100%;
  z-index: 999;
  border: #4396fd 1px solid;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  box-sizing: border-box;
  cursor: pointer;
  color: #4396fd;
  .full-screen {
    font-size: 16px;
    margin-right: 5px;
  }
}
</style>