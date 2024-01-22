<template>
  <div v-if="!IsStatic() && !targetData.chartConfig.conDataKey" class="go-chart-configurations-data">
    <setting-item-box name="数据源" :alone="true">
      <n-select v-model:value="targetData.commonData.currentSource" :options="sourceOptions" size="small"/>
    </setting-item-box>
    <PointHistory v-if="targetData.commonData.currentSource === CurrentSourceEnum.POINTHISTORY"/>
    <EnergyUseHistory v-else-if="targetData.commonData.currentSource === CurrentSourceEnum.ENERGYUSEHISTORY"/>
    <RecordValueHistoryType v-else-if="targetData.commonData.currentSource === CurrentSourceEnum.RECORDVALUEHISTORY"/>
    <setting-item-box name="更新间隔" :alone="true">
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
  <div v-else-if="!IsStatic() && targetData.chartConfig.conDataKey">
    <component :is="targetData.chartConfig.conDataKey" :customData="targetData.customData" :request="targetData.request"></component>
    <setting-item-box v-if="targetData?.customData?.showInterval" name="更新间隔" :alone="true">
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
  <div v-else-if="IsStatic()">
    暂无数据
  </div>
</template>

<script setup lang="ts">
import PointHistory from './components/PointHistory.vue'
import EnergyUseHistory from './components/EnergyUseHistory.vue'
import RecordValueHistoryType from './components/RecordValueHistory.vue'
import type { Ref } from 'vue'
import { loadAsyncComponent } from '@/utils'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../hooks/useTargetData.hook'
import { sourceOptions, selectTimeOptions } from './index.d'
import { CurrentSourceEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { PackagesCategoryEnum, CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'


// const ChartDataStatic = loadAsyncComponent(() => import('./components/ChartDataStatic/index.vue'))

const { targetData } = useTargetData() as { targetData: Ref<CreateComponentType | CreateComponentGroupType> }

/*
* 通用组件: 通用数据
* 自定义组件: 自定义数据
* 静态组件: 无数据
* */
// 通用组件 自定义组件 静态组件

const IsStatic = () => {
  let arr = [
      PackagesCategoryEnum.BACKGROUNDS
  ]
  return arr.some(_ => _ === targetData.value.chartConfig.category)
}
</script>
