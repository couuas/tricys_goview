<template>
  <div class="go-text-box">
    <div class="content">
      <span
        :style="{cursor: link ? 'pointer' : 'unset', color: option.showStatusColor ? computeColor(dataStatus).remark : ''}"
        style="cursor: pointer; white-space: pre-wrap"
        @click="link ? click : () => {}"
      >
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
import { PropType, toRefs, shallowReactive, watch, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'
import { useChartCommonData } from '@/hooks'
import { resultType } from '@/store/modules/chartEditStore/chartEditStore.d'
import {useOriginStore} from "@/store/modules/originStore/originStore";

const originStore = useOriginStore()
const node_status = originStore?.getOriginStore?.user?.systemConstant?.node_status

const computeColor = (status: number | undefined) => {
  type ItemType = {
    value: string,
    remark: string,
    label: string
  }
  if(node_status.length && typeof status === 'number') {
    return node_status.find((_: ItemType) => _.value == status.toString())
  }
  else {
    return {
      remark: '#aaaaaa',
      label: '无'
    }
  }
}

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const {
  linkHead,
  link,
  fontColor,
  fontSize,
  letterSpacing,
  paddingY,
  paddingX,
  textAlign,
  borderWidth,
  borderColor,
  borderRadius,
  writingMode,
  backgroundColor,
  fontWeight
} = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: configOption.dataset,
  showUnit: configOption.showUnit,
  showStatusColor: configOption.showStatusColor
})

// 手动更新
watch(
  [() => props.chartConfig.option.dataset, () => props.chartConfig.option.showUnit, () => props.chartConfig.option.showStatusColor],
  ([newData, newShowUnit, showStatusColor]: [any, boolean, boolean]) => {
    console.log(newData,'newData_watch')
    option.dataset = newData
    option.showUnit = newShowUnit
    option.showStatusColor = showStatusColor
  },
  {
    immediate: true,
    deep: false
  }
)

const dataEnable = ref()
const dataValue = ref()
const dataUnit = ref()
const dataStatus = ref()
watch(
  () => props.chartConfig.commonData,
  newData => {
    try {
      const data = newData[newData.currentSource] as Object & { enable: boolean, result: resultType }
      dataEnable.value = data.enable
      dataValue.value = data.result.value
      dataUnit.value = data.result.unit
      dataStatus.value = data.result.status
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

// // 预览更新
// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: string) => {
//   option.dataset = newData
// })

useChartCommonData(props.chartConfig, useChartEditStore)

//打开链接
const click = () => {
  window.open(linkHead.value + link.value)
}
</script>

<style lang="scss" scoped>
@include go('text-box') {
  display: flex;
  align-items: center;
  justify-content: v-bind('textAlign');
  overflow: hidden;

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
  }
}
</style>
