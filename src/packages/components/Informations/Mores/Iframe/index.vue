<template>
  <div :style="getStyle(borderRadius)" style="position: relative;">
    <iframe ref="iframe" :style="iframeStyle" :src="src" :width="w" :height="h"  allowfullscreen sandbox="allow-forms allow-scripts allow-same-origin allow-popups" style="border-width: 0"></iframe>
    <n-button
      ref="myBtn"
      @mousedown="startDrag"
      @mousemove="handleDrag"
      @mouseup="endDrag"
      @mouseout="endDrag"
      @dblclick="clickBtn"
      class="myBtn"
      :style="{left: `${dragObj.x}px`, top: `${dragObj.y}px`}"
    >
      {{!isScreen ? '全屏' : '退出全屏'}}
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import {debounce} from 'lodash'
import {postMessageToParent} from "@/utils";

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  },
  isGroup: {
    type: Boolean
  },
  groupAttr: {
    type: Object,
    default() {
      return {}
    }
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { borderRadius } = toRefs(props.chartConfig.option)

// const option = shallowReactive({
//   dataset: ''
// })

let scale = ref({
  x: 1,
  y: 1
})
let handleResize = () => {
  if(!document.querySelector('.go-preview-scale')) return
  let scaleValue = (document.querySelector('.go-preview-scale') as HTMLElement).style.transform
  const regex = /scale\((\d+(\.\d+)?), (\d+(\.\d+)?)\)/;
  const matches = scaleValue.match(regex);
  if (matches) {
    scale.value.x = parseFloat(matches[1]);
    scale.value.y = parseFloat(matches[3]);
  }
}
onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.dispatchEvent(new Event('resize'))
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const emit = defineEmits(['fullScreen'])
const isScreen = ref(false)
const iframeStyle = ref({})
const iframe: any = ref(null)

const clickBtn = () => {
  isScreen.value = !isScreen.value
  if(isScreen.value) {
    postMessageToParent({type: 'fullScreen'})
    emit('fullScreen')
    iframeStyle.value = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 999999 }
  }
  else {
    postMessageToParent({type: 'fullScreen'})
    emit('fullScreen')
    iframeStyle.value = {}
  }
}

let dragObj = reactive({
  isDraging: false,
  offsetX: 0,
  offsetY: 0,
  x: w.value - 80,
  y: 20,
})

const myBtn = ref(null)
const startDrag = (e: MouseEvent) => {
  dragObj.offsetX = e.offsetX * scale.value.x
  dragObj.offsetY = e.offsetY * scale.value.y
  dragObj.isDraging = true
}

const parentAttr = computed(() => {
  if(props.isGroup) {
    let obj = JSON.parse(JSON.stringify(props.groupAttr))
    obj.x += props.chartConfig.attr.x
    obj.y += props.chartConfig.attr.y
    return obj
  }
  else return props.chartConfig.attr
})

const handleDrag = (e: MouseEvent) => {
  if(!dragObj.isDraging) return
  let parentOffsetLeft = parentAttr.value.x * scale.value.x
  let parentOffsetTop = parentAttr.value.y * scale.value.y
  if(!isScreen.value) {
    dragObj.x = (e.clientX - dragObj.offsetX - parentOffsetLeft) / scale.value.x
    dragObj.y = (e.clientY - dragObj.offsetY - parentOffsetTop) / scale.value.y
  }
  else {
    dragObj.x = (e.clientX - dragObj.offsetX) / scale.value.x
    dragObj.y = (e.clientY - dragObj.offsetY) / scale.value.y
  }
}
const endDrag = () => {
  dragObj.isDraging = false
}

let src = ref('')
const setValue = debounce((v: string) => {
  src.value = v
}, 1000)
watch(
  () => props.chartConfig.option.dataset,
  (v: string) => {
    setValue(v)
  },
  {
    immediate: true
  }
)

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

// // 编辑更新
// watch(
//   () => props.chartConfig.option.dataset,
//   (newData: string) => {
//     option.dataset = newData
//   },
//   {
//     immediate: true
//   }
// )

// // 预览更新
// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: string) => {
//   option.dataset = newData
// })
</script>

<style lang="scss">
.myBtn{
  position: fixed;
  left: 20px;
  top: 20px;
  z-index: 9999999;
  span, div{
    pointer-events: none;
  }
}
</style>
