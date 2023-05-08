<template>
  <div class="sizeScroll go-text-box">
    <div class="content">
      <div ref="textAutoBox" id="inner" class="innerActive">
        <div id="textAutoBox" v-html="option.dataset"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, ref, onMounted, nextTick } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)

const {
  dataset,
  fontColor,
  fontSize,
  letterSpacing,
  paddingY,
  paddingX,
  borderWidth,
  borderColor,
  borderRadius,
  writingMode,
  backgroundColor,
  animation
} = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: configOption.dataset
})

let textAutoBox = ref()
let showDown = false
onMounted(() => {
  if (textAutoBox.value.clientHeight > props.chartConfig.attr.h) {
    showDown = true
  }
  if (!showDown) {
    nextTick(() => {textAutoBox.value.style.animationDuration = '0s'})
  }
})

// 手动更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
    if (textAutoBox.value !== undefined) {
      showDown = false
      nextTick(() => {
        if (textAutoBox.value.clientHeight > props.chartConfig.attr.h) {
          showDown = true
        }
        if (!showDown) {
          setTimeout(() => {
            textAutoBox.value.style.animationDuration = `0s`
          }, 200);
        } else {
          setTimeout(() => {
            textAutoBox.value.style.animationDuration = `${animation.value}s`
          }, 200);
        }
      })
    }
  },
  {
    immediate: true
  }
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: string) => {
  option.dataset = newData
})

</script>

<style lang="scss" scoped>
@include go('text-box') {
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    color: v-bind('fontColor');
    padding: v-bind('`${paddingY}px ${paddingX}px`');
    font-size: v-bind('fontSize + "px"');
    letter-spacing: v-bind('letterSpacing + "px"');
    writing-mode: v-bind('writingMode');
    font-weight: v-bind('fontWeight');
    border-style: solid;
    border-width: v-bind('borderWidth + "px"');
    border-radius: v-bind('borderRadius + "px"');
    border-color: v-bind('borderColor');
    background-color: v-bind('backgroundColor');
    .innerActive {
      width: 100%;
      animation: slide v-bind('animation + "s"') linear infinite;
      #textAutoBox {
        display: inline-block;
        width: 100%;
        height: auto;
        overflow: auto;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: pre-wrap;
      }
    }
  }
  @keyframes slide {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }
}
h1 {
  font-weight: bold;
}
.sizeScroll {
  overflow: hidden;
  .content {
    overflow: hidden;
    position: relative;
    white-space: nowrap;
  }
}
</style>