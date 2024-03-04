<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="target.enable"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="告警确认" :alone="true">
    <n-select multiple v-model:value="target.confirm_statuses" :options="options0" size="small"/>
  </setting-item-box>
  <setting-item-box name="告警恢复" :alone="true">
    <n-select multiple v-model:value="target.recovery_statuses" :options="options1" size="small"/>
  </setting-item-box>
  <setting-item-box name="告警等级" :alone="true">
    <n-select multiple v-model:value="target.levels" :options="options2" size="small"/>
  </setting-item-box>
  <setting-item-box name="空间ID" :alone="true">
    <n-input v-model:value="target.space_complete_id" size="small"/>
  </setting-item-box>
</template>

<script lang="ts" setup>
import {watch, reactive, computed} from 'vue'
import type {Ref} from 'vue'
import {SettingItemBox} from '@/components/Pages/ChartItemSetting'
import {useTargetData} from '../../hooks/useTargetData.hook'
import {DateOptions, PolicyOptions} from './ComponentsType.d'
import {icon} from '@/plugins/icon'
import {commonDataType, MonthAlarmClassType} from '@/store/modules/chartEditStore/chartEditStore.d'
import { useOriginStore } from '@/store/modules/originStore/originStore'

const {CloseIcon, AddIcon} = icon.ionicons5

const {targetData} = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }

const target = computed(() => {
  return targetData.value.commonData[targetData.value.commonData.currentSource] as MonthAlarmClassType
})

// const recordValueHistory: Ref<RecordValueHistoryType> = computed(() => targetData.value.commonData.recordValueHistory)

type computeIdsItemType = {
  id: string,
  value: number | null
}

const originStore = useOriginStore()

const systemConstant = originStore.getOriginStore?.user?.systemConstant
let options2
if(systemConstant.warn_levels) {
  type ItemType = {
    label: string,
    value: string,
    remark: string
  }
  options2 = systemConstant['warn_levels'].filter((item: ItemType) => item.value !== '').map((item: any) => {
    return { label: item.label, value: Number(item.value), remark: item.remark }
  })
}

const systemConfig = originStore.getOriginStore?.user?.systemConfig

target.value.levels = []
for (let i = 1; i <= Number(systemConfig.history_alarm_level); i++) {
  target.value.levels.push(i)
}

const options1 = [
  {label: '已恢复', value: 'ok'},
  {label: '未回复', value: 'not'},
]

target.value.recovery_statuses = []
if (typeof (systemConfig.history_alarm_recovery_status) !== 'undefined') {
  for (const item of JSON.parse(systemConfig.history_alarm_recovery_status)) {
    target.value.recovery_statuses.push(item)
  }
}

const options0 = [
  {label: '已确认', value: 'ok'},
  {label: '未确认', value: 'not'},
]

target.value.confirm_statuses = []
if (typeof (systemConfig.history_alarm_confirm_status) !== 'undefined') {
  for (const item of JSON.parse(systemConfig.history_alarm_confirm_status)) {
    target.value.confirm_statuses.push(item)
  }
}

// const options2 = [
//   {label: 1, value: 1},
//   {label: 2, value: 2},
//   {label: 3, value: 3},
//   {label: 4, value: 4},
// ]

</script>

<style lang="scss" scoped>

</style>
