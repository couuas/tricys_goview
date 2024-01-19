<template>
  <div class="go-chart-configurations-data" v-if="targetData && !targetData.chartConfig.conDataKey">
    <setting-item-box name="数据源" :alone="true">
      <n-select v-model:value="targetData.commonData.currentSource" :options="sourceOptions" size="small"/>
    </setting-item-box>
    <PointHistory v-if="targetData.commonData.currentSource === CurrentSourceEnum.POINTHISTORY"/>
    <EnergyUseHistory v-if="targetData.commonData.currentSource === CurrentSourceEnum.ENERGYUSEHISTORY"/>
  </div>
  <div v-if="targetData && targetData.chartConfig.conDataKey">
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
</template>

<script setup lang="ts">
import PointHistory from './components/PointHistory.vue'
import EnergyUseHistory from './components/EnergyUseHistory.vue'
import { computed } from 'vue'
import { loadAsyncComponent } from '@/utils'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../hooks/useTargetData.hook'
import { sourceOptions, selectTimeOptions } from './index.d'
import { CurrentSourceEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

// const ChartDataStatic = loadAsyncComponent(() => import('./components/ChartDataStatic/index.vue'))

const { targetData } = useTargetData()
console.log(targetData)

</script>
