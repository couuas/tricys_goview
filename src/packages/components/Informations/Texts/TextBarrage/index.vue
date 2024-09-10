<template>
  <div class="go-text-box">
    <div class="content">
      <span>
        <template v-if="!dataEnable">
          {{ option.dataset }}
        </template>
        <template v-else>
          {{ dataValue }}{{ option.showUnit ? dataUnit : '' }}
        </template>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, computed, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartCommonData } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'
import { values } from 'lodash'
import { resultType } from '@/store/modules/chartEditStore/chartEditStore.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const { w } = toRefs(props.chartConfig.attr)

const { fontColor, fontSize, letterSpacing, fontWeight, animationTime, animationSpeed, boxShadow } = toRefs(
  props.chartConfig.option
)

const option = shallowReactive({
  dataset: configOption.dataset,
  showUnit: configOption.showUnit
})

// 手动更新
watch(
  [() => props.chartConfig.option.dataset, () => props.chartConfig.option.showUnit],
  ([newData, newShowUnit]: [any, boolean]) => {
    option.dataset = newData
    option.showUnit = newShowUnit
  },
  {
    immediate: true,
    deep: false
  }
)

//阴影
watch(
  props.chartConfig.option,
  () => {
    try {
      if (props.chartConfig.option.showShadow) {
        boxShadow.value = `${props.chartConfig.option.hShadow}px ${props.chartConfig.option.vShadow}px ${props.chartConfig.option.blurShadow}px ${props.chartConfig.option.colorShadow}`
      } else {
        boxShadow.value = 'none'
      }
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true
  }
)

const dataEnable = ref()
const dataValue = ref()
const dataUnit = ref()
watch(
  () => props.chartConfig.commonData,
  newData => {
    try {
      const data = newData[newData.currentSource] as Object & { enable: boolean, result: resultType }
      dataEnable.value = data.enable
      dataValue.value = data.result.value
      dataUnit.value = data.result.unit
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const transitionDuration = computed(() => {
  return Math.floor((w.value as any) / (animationSpeed.value as any))
})

// // 预览更新
// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: string) => {
//   option.dataset = newData
// })

useChartCommonData(props.chartConfig, useChartEditStore)
</script>

<style lang="scss" scoped>
@include go('text-box') {
  display: flex;
  align-items: center;
  overflow: hidden;
  .content {
    width: 100%;
    color: v-bind('fontColor');
    font-size: v-bind('fontSize + "px"');
    letter-spacing: v-bind('letterSpacing + "px"');
    font-weight: v-bind('fontWeight');
    text-shadow: v-bind('boxShadow');
    position: absolute;
    animation: barrage v-bind('transitionDuration + "s"') linear v-bind('animationTime + "s"') infinite;
  }
  @keyframes barrage {
    from {
      left: 100%;
      transform: translateX(0);
    }
    to {
      left: 0;
      transform: translateX(-100%);
    }
  }
}
</style>
