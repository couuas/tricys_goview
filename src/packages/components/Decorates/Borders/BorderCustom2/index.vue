<template>
  <div class="box" :style="{borderLeft: `2px solid ${computeColor(dataset.status).remark}`}"></div>
</template>

<script setup lang="ts">
import { useOriginStore } from "@/store/modules/originStore/originStore";
import { PropType, computed } from "vue";
import { CreateComponentType } from '@/packages/index.d'
import {useChartCommonData} from "@/hooks";
import {useChartEditStore} from "@/store/modules/chartEditStore/chartEditStore";

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const originStore = useOriginStore()
const node_status = originStore?.getOriginStore?.user?.systemConstant?.node_status

const computeColor = (status: number | undefined | null) => {
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

const dataset = computed(() => props.chartConfig.option.dataset)

useChartCommonData(props.chartConfig, useChartEditStore, (resData: {}) => {
  props.chartConfig.option.dataset = resData
})
</script>

<style lang="scss" scoped>
.box{
  background: rgba(65, 150, 255, 0.08);
  display: flex;
  align-items: center;
}
</style>