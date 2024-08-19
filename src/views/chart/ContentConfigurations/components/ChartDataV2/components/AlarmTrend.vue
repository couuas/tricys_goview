<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="currentObj.enable"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="测点ID" :alone="true">
    <n-input v-model:value="currentObj.signal_ids" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="告警确认状态(双引号包裹内容+英文逗号隔开)" :alone="true">
    <n-input v-model:value="currentObj.alarmConfirmStatus" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="告警恢复状态(双引号包裹内容+英文逗号隔开)" :alone="true">
    <n-input v-model:value="currentObj.alarmRecoveryStatus" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="告警恢复状态(双引号包裹内容+英文逗号隔开)" :alone="true">
    <n-input v-model:value="currentObj.level" size="small" placeholder="请输入"/>
  </setting-item-box>
 
 
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import type {Ref} from 'vue'
import {SettingItemBox} from '@/components/Pages/ChartItemSetting'
import {useTargetData} from '../../hooks/useTargetData.hook'
import {commonDataType, AlarmTrendType} from '@/store/modules/chartEditStore/chartEditStore.d'
const {targetData} = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }

const currentObj = computed(() => {
  return targetData.value.commonData[targetData.value.commonData.currentSource] as AlarmTrendType
})

</script>

<style lang="scss" scoped>

</style>
