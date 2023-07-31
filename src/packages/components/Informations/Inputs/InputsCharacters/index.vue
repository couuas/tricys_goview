<template>
  <div class="go-text-box">
    <div class="content" @click="onChange(option.datasetValue)">
      <span style="white-space: pre-wrap" >{{ option.dataset }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import {useChartDataFetch, useChartInteract} from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { ComponentInteractParamsEnum } from './interact'
import {InteractEventOn} from "@/enums/eventEnum";

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const {
  fontSize,
  fontColor,
  textAlign,
  letterSpacing,
  paddingY,
  paddingX,
  writingMode,
  borderWidth,
  borderColor,
  borderRadius,
  backgroundColor,
  fontWeight
} = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: props.chartConfig.option.dataset,
  datasetValue:props.chartConfig.option.datasetValue
})

const onChange = (v: string) => {
  if(v == undefined) return;
  // 存储到联动数据
  useChartInteract(
      props.chartConfig,
      useChartEditStore,
      { [ComponentInteractParamsEnum.DATA]: v },
      InteractEventOn.CLICK
  )
  return v;
}

// 手动更新
watch(
    () => props.chartConfig.option.dataset,
    (newData: any) => {
      option.dataset = newData
    },
    {
      immediate: true,
      deep: false
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
  justify-content: v-bind('textAlign');

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

    &:hover {
      cursor: pointer;
    }
  }
}
</style>