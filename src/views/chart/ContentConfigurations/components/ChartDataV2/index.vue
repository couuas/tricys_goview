<template>
  <div v-if="!IsStatic && !targetData.chartConfig.conDataKey" class="go-chart-configurations-data">
    <template v-if="!IsCommonSingle">
      <setting-item-box name="数据源" :alone="true">
        <n-select v-model:value="targetData.commonData.currentSource" :options="multipleSourceOptions" size="small"/>
      </setting-item-box>
      <PointHistory v-if="matchComponent(CurrentSourceEnum.POINTHISTORY)"/>
      <EnergyUseHistory v-else-if="matchComponent(CurrentSourceEnum.ENERGYUSEHISTORY)"/>
      <RecordValueHistory v-else-if="matchComponent(CurrentSourceEnum.RECORDVALUEHISTORY)"/>
      <PointRealTime v-else-if="matchComponent(CurrentSourceEnum.POINTREALTIME)"/>
      <MonthAlarmClass v-else-if="matchComponent(CurrentSourceEnum.MONTHALARMCLASS)"/>
      <DeviceClass v-else-if="matchComponent(CurrentSourceEnum.DEVICECLASS)"/>
      <AssetsClass v-else-if="matchComponent(CurrentSourceEnum.ASSETSCLASS)"/>
      <CompanyTempTop v-else-if="matchComponent(CurrentSourceEnum.COMPANYTEMPTOP)"/>
      <AlarmTrend v-else-if="matchComponent(CurrentSourceEnum.ALARMTREND)"/>
      <PointTable v-else-if="matchComponent(CurrentSourceEnum.POINTTABLE)"/>
      <CategoryBrandCountTable v-else-if="matchComponent(CurrentSourceEnum.CATEGORYBRANDCOUNTTABLE)"/>
      <ManualInput v-else-if="matchComponent(CurrentSourceEnum.MANUALINPUT)"/>
   
    </template>
    <template v-else-if="IsCommonSingle">
      <setting-item-box name="数据源" :alone="true">
        <n-select v-model:value="targetData.commonData.currentSource" :options="singleSourceOptions" size="small"/>
      </setting-item-box>
      <SinglePoint v-if="matchComponent(CurrentSourceEnum.SINGLEPOINT)"/>
      <ManualInputSingle v-if="matchComponent(CurrentSourceEnum.MANUALINPUTSINGLE)"/>
    </template>
    <setting-item-box name="数据量" :alone="true">
      <n-input-number v-model:value="targetData.commonData.dataLength" size="small"/>
    </setting-item-box>
    <setting-item-box v-if="!matchComponent(CurrentSourceEnum.MANUALINPUT)" name="更新间隔" :alone="true">
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
  <div v-else-if="!IsStatic && targetData.chartConfig.conDataKey">
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
  <div v-else-if="IsStatic">
    暂无数据
  </div>
</template>

<script setup lang="ts">
import PointHistory from './components/PointHistory.vue'
import EnergyUseHistory from './components/EnergyUseHistory.vue'
import RecordValueHistory from './components/RecordValueHistory.vue'
import PointRealTime from './components/PointRealTime.vue'
import SinglePoint from './components/SinglePoint.vue'
import MonthAlarmClass from './components/MonthAlarmClass.vue'
import AssetsClass from './components/AssetsClass.vue'
import CompanyTempTop from './components/CompanyTempTop.vue'
import AlarmTrend from './components/AlarmTrend.vue'
import DeviceClass from './components/DeviceClass.vue'
import PointTable from './components/PointTable.vue'
import CategoryBrandCountTable from './components/CategoryBrandCountTable.vue'
import ManualInput from './components/ManualInput.vue'
import ManualInputSingle from './components/ManualInputSingle.vue'
import NoParam from './components/NoParam.vue'
import { computed } from 'vue'
import type { Ref } from 'vue'
import { loadAsyncComponent } from '@/utils'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../hooks/useTargetData.hook'
import { sourceOptions, optionTypeEnum, selectTimeOptions } from './index.d'
import { CurrentSourceEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { PackagesCategoryEnum, CreateComponentType, CreateComponentGroupType, ChartFrameEnum } from '@/packages/index.d'
import { PieCircleConfig } from '@/packages/components/Charts/Pies/PieCircle/index'
import { TextBarrageConfig } from "@/packages/components/Informations/Texts/TextBarrage/index";
import { TextCommonConfig } from "@/packages/components/Informations/Texts/TextCommon/index";
import { TextGradientConfig } from "@/packages/components/Informations/Texts/TextGradient/index";
import { WaterPoloConfig } from "@/packages/components/Charts/Mores/WaterPolo/index";
import { DashboardConfig } from '@/packages/components/CustomComponents/CustomComponents/Dashboard/index'
import { BorderCustom2Config } from '@/packages/components/Decorates/Borders/BorderCustom2/index'

// const ChartDataStatic = loadAsyncComponent(() => import('./components/ChartDataStatic/index.vue'))

const { targetData } = useTargetData() as { targetData: Ref<CreateComponentType | CreateComponentGroupType> }

/*
* 通用组件: 通用数据
* 自定义组件: 自定义数据
* 静态组件: 无数据
* */
// 通用组件 自定义组件 静态组件
const IsStatic = computed(() => {
  return targetData.value.chartConfig.chartFrame === ChartFrameEnum.STATIC
})

/*
* 通用组件再分为: 多个点的数据和 一个点的数据(用于圆环图等)
 */
const IsCommonSingle = computed(() => {
  let singleCharArr = [
    PieCircleConfig,
    TextBarrageConfig,
    TextCommonConfig,
    TextGradientConfig,
    WaterPoloConfig,
    DashboardConfig,
    BorderCustom2Config,
  ]
  const { package:packageStr, category, key } = targetData.value.chartConfig
  const flag = singleCharArr.some(_ => {
    return _.package === packageStr && _.category === category && _.key === key
  })
  return flag
})

const multipleSourceOptions = sourceOptions.filter(_ => _.type === optionTypeEnum.MULTIPLE)
const singleSourceOptions = sourceOptions.filter(_ => _.type === optionTypeEnum.SINGLE)

const matchComponent = (name: string) => {
  console.log(name,'name---')
  return targetData.value.commonData.currentSource === name
}
</script>
