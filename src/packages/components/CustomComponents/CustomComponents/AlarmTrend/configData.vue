<template>
  <setting-item-box name="标题1" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
  </setting-item-box>
 
  <setting-item-box name="测点ID" :alone="true">
    <n-input v-model:value="props.customData.signal_ids" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="告警确认状态" :alone="true">
    <n-select v-model:value="props.customData.alarmConfirmStatus" multiple :options="confirmStatusOption" size="small"/>
  </setting-item-box>
    <setting-item-box name="告警恢复状态" :alone="true">
    <n-select v-model:value="props.customData.alarmRecoveryStatus" multiple :options="recoveryStatusOption" size="small"/>
  </setting-item-box>
  <setting-item-box name="告警等级" :alone="true">
    <n-select v-model:value="props.customData.level" multiple :options="levelOptions" size="small"/>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import {computed} from "vue";
import {cloneDeep} from "lodash";
import {icon} from "@/plugins";
const props = defineProps(['customData', 'request'])

import { useOriginStore } from '@/store/modules/originStore/originStore'
const originStore = useOriginStore()
const systemConstant = originStore?.getOriginStore?.user?.systemConstant
const levelOptions =  systemConstant['warn_levels'].filter((item:any)=>{
if(item.value){
  item.value = item.value*1
  return item
}
})


const confirmStatusOption =  [
        { label: '已确认', value: 'ok' },
        { label: '未确认', value: 'not' }
      ]
const recoveryStatusOption =  [
        { label: '已恢复', value: 'ok' },
        { label: '未恢复', value: 'not' }
      ]
</script>

<style lang="scss" scoped>
</style>
