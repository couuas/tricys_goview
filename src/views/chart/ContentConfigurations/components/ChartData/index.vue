<template>
  <div class="go-chart-configurations-data" v-if="targetData && !targetData.chartConfig.conDataKey">
    <setting-item-box name="请求方式" :alone="true">
      <n-select v-model:value="targetData.request.requestDataType" :disabled="isNotData" :options="selectOptions" />
    </setting-item-box>
    <!-- 静态 -->
    <chart-data-static v-if="targetData.request.requestDataType === RequestDataTypeEnum.STATIC"></chart-data-static>
    <!-- 动态 -->
    <chart-data-ajax v-if="targetData.request.requestDataType === RequestDataTypeEnum.AJAX"></chart-data-ajax>
    <!-- 数据池 -->
    <chart-data-pond v-if="targetData.request.requestDataType === RequestDataTypeEnum.Pond"></chart-data-pond>
  </div>
  <div v-if="targetData && targetData.chartConfig.conDataKey">
    <component :is="targetData.chartConfig.conDataKey" :customData="targetData.customData" :request="targetData.request"></component>
    <setting-item-box v-if="targetData.customData.showInterval" name="更新间隔" :alone="true">
      <n-input-group>
        <n-input-number
          v-model:value.trim="targetData.request.requestInterval"
          min="0"
          :show-button="false"
          placeholder="请输入"
          size="small"
          style="flex: 1;"
        >
        </n-input-number>
        <!-- 单位 -->
        <n-select class="select-time-options" v-model:value="targetData.request.requestIntervalUnit" :options="selectTimeOptions" size="small" style="width: 80px"/>
      </n-input-group>
    </setting-item-box>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { loadAsyncComponent } from '@/utils'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { ChartFrameEnum } from '@/packages/index.d'
import { useTargetData } from '../hooks/useTargetData.hook'
import { SelectCreateDataType, SelectCreateDataEnum } from './index.d'
import { selectTypeOptions, selectTimeOptions } from '@/views/chart/ContentConfigurations/components/ChartData/index.d'

const ChartDataStatic = loadAsyncComponent(() => import('./components/ChartDataStatic/index.vue'))
const ChartDataAjax = loadAsyncComponent(() => import('./components/ChartDataAjax/index.vue'))
const ChartDataPond = loadAsyncComponent(() => import('./components/ChartDataPond/index.vue'))

const { targetData } = useTargetData()

// 选项
const selectOptions: SelectCreateDataType[] = [
  {
    label: SelectCreateDataEnum.STATIC,
    value: RequestDataTypeEnum.STATIC
  },
  {
    label: SelectCreateDataEnum.AJAX,
    value: RequestDataTypeEnum.AJAX
  },
  {
    label: SelectCreateDataEnum.Pond,
    value: RequestDataTypeEnum.Pond
  }
]

// 无数据源
const isNotData = computed(() => {
  return (
    targetData.value.chartConfig?.chartFrame === ChartFrameEnum.STATIC ||
    typeof targetData.value?.option?.dataset === 'undefined'
  )
})
</script>
