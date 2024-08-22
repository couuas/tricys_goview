<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="currentObj.enable"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="测点ID" :alone="true">
    <n-input v-model:value="currentObj.signal_ids" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="告警确认状态" :alone="true">
    <n-select v-model:value="currentObj.alarmConfirmStatus" multiple :options="confirmStatusOption" size="small"/>
  </setting-item-box>
    <setting-item-box name="告警恢复状态" :alone="true">
    <n-select v-model:value="currentObj.alarmRecoveryStatus" multiple :options="recoveryStatusOption" size="small"/>
  </setting-item-box>
  <setting-item-box name="告警等级" :alone="true">
    <n-select v-model:value="currentObj.level" multiple :options="levelOptions" size="small"/>
  </setting-item-box>
  
 
 
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import type {Ref} from 'vue'
import {SettingItemBox} from '@/components/Pages/ChartItemSetting'
import {useTargetData} from '../../hooks/useTargetData.hook'
import {commonDataType, AlarmTrendType} from '@/store/modules/chartEditStore/chartEditStore.d'
import { useOriginStore } from '@/store/modules/originStore/originStore'
const originStore = useOriginStore()
const systemConstant = originStore?.getOriginStore?.user?.systemConstant
const levelOptions =  systemConstant['warn_levels'].filter((item:any)=>{
if(item.value){
  item.value = item.value*1
  return item
}
})
const {targetData} = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }

const currentObj = computed(() => {
  return targetData.value.commonData[targetData.value.commonData.currentSource] as AlarmTrendType
})
const confirmStatusOption =  [
        { label: '已确认', value: 'ok' },
        { label: '未确认', value: 'not' }
      ]
const recoveryStatusOption =  [
        { label: '已恢复', value: 'ok' },
        { label: '未恢复', value: 'not' }
      ]
// const recoveryStatusOption =  [
//         { label: '已恢复', value: 'ok' },
//         { label: '未恢复', value: 'not' }
//       ]
</script>

<style lang="scss" scoped>

</style>
