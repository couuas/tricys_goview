<template>
  <n-space vertical>
    <setting-item-box name="标题" :alone="true">
      <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
    </setting-item-box>
    <setting-item-box name="测点编码(双引号包裹内容+英文逗号隔开)" :alone="true">
    <n-input v-model:value="props.customData.signal_ids" size="small" placeholder="请输入"/>
  </setting-item-box>
  <!-- <setting-item-box name="空间ID" :alone="true">
    <n-input v-model:value="props.customData.space_complete_id" size="small" placeholder="请输入"/>
  </setting-item-box> -->
  <setting-item-box name="告警确认状态" :alone="true">
    <n-select v-model:value="props.customData.alarmConfirmStatus" multiple :options="confirmStatusOption" size="small"/>
  </setting-item-box>
  <setting-item-box name="告警恢复状态" :alone="true">
    <n-select v-model:value="props.customData.alarmRecoveryStatus" multiple :options="recoveryStatusOption" size="small"/>
  </setting-item-box>
 
  </n-space>
</template>

<script lang="ts" setup>
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
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
