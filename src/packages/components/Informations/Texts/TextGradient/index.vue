<template>
  <div class="go-text-box">
    <n-gradient-text :size="size" :gradient="gradient">
      <template v-if="!dataEnable">
        {{ option.dataset }}
      </template>
      <template v-else>
        {{ dataValue }}{{ option.showUnit ? dataUnit : '' }}
      </template>
    </n-gradient-text>
  </div>
</template>
<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartCommonData } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'
import { resultType } from '@/store/modules/chartEditStore/chartEditStore.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const option = shallowReactive({
  dataset: configOption.dataset,
  showUnit: configOption.showUnit
})

const { w, h } = toRefs(props.chartConfig.attr)
const { size, gradient } = toRefs(props.chartConfig.option)

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

// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
//   option.dataset = newData
// })

useChartCommonData(props.chartConfig, useChartEditStore)
</script>

<style lang="scss" scoped>
@include go('text-box') {
  display: flex;
  align-items: center;
  justify-content: center;
  .n-gradient-text {
    white-space: initial;
  }
}
</style>
