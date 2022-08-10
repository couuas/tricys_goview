<template>
   <v-chart ref="vChartRef" :theme="themeColor" :option="option" :manual-update="isPreview()" autoresize></v-chart>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { FunnelChart  } from 'echarts/charts'
import { 
  DatasetComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components' 
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { mergeTheme } from '@/packages/public/chart'
import { isPreview } from '@/utils'
import { CreateComponentType } from '@/packages/index.d'
import { includes } from './config'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

use([
  DatasetComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  FunnelChart
])


const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)


</script>

<style lang="scss" scoped>

</style>