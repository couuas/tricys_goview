<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="target.enable"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="告警确认" :alone="true">
    <n-select multiple v-model:value="target.confirm_statuses" :options="options1" size="small"/>
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
import {commonDataType, RecordValueHistoryType} from '@/store/modules/chartEditStore/chartEditStore.d'

const {CloseIcon, AddIcon} = icon.ionicons5

const {targetData} = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }

const target = computed(() => {
  return targetData.value.commonData[targetData.value.commonData.currentSource]
})

// const recordValueHistory: Ref<RecordValueHistoryType> = computed(() => targetData.value.commonData.recordValueHistory)

type computeIdsItemType = {
  id: string,
  value: number | null
}

const options1 = [
  {label: 'ok', value: 'ok'},
  {label: 'not', value: 'not'},
]

const options2 = [
  {label: 1, value: 1},
  {label: 2, value: 2},
  {label: 3, value: 3},
  {label: 4, value: 4},
]

</script>

<style lang="scss" scoped>

</style>
