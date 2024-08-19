<template>
  <setting-item-box name="标题" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入标题"/>
  </setting-item-box>
  <setting-item-box name="空间ID" :alone="true">
    <n-input v-model:value="props.customData.space_complete_id" size="small" placeholder="请输入空间ID"/>
  </setting-item-box>
  <setting-item-box name="测点ID" :alone="true">
    <n-input v-model:value="props.customData.signal_ids" size="small" placeholder="请输入"/>
  </setting-item-box>
  
  <setting-item-box name="告警确认状态" :alone="true">
    <n-select v-model:value="props.customData.confirm_statuss" multiple :options="confirmStatusOption" size="small"/>

  </setting-item-box>
</template>

<script lang="ts" setup>
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
const confirmStatusOption =  [
        { label: '已确认', value: 'ok' },
        { label: '未确认', value: 'not' }
      ]
</script>

<style lang="scss" scoped>
</style>
