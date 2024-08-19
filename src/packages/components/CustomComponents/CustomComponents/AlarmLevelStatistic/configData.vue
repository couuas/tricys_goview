<template>
  <n-space vertical>
    <setting-item-box name="标题" :alone="true">
      <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
    </setting-item-box>
    <setting-item-box name="测点ID" :alone="true">
    <n-input v-model:value="props.customData.signal_ids" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="空间ID" :alone="true">
    <n-input v-model:value="props.customData.space_complete_id" size="small" placeholder="请输入"/>
  </setting-item-box>
      <setting-item-box name="告警确认状态(双引号包裹内容+英文逗号隔开)" :alone="true">
    <n-input v-model:value="props.customData.alarmConfirmStatus" size="small" placeholder="请输入"/>
  </setting-item-box>
      <setting-item-box name="告警恢复状态(双引号包裹内容+英文逗号隔开)" :alone="true">
    <n-input v-model:value="props.customData.alarmRecoveryStatus" size="small" placeholder="请输入"/>
  </setting-item-box>
  </n-space>
</template>

<script lang="ts" setup>
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])

</script>

<style lang="scss" scoped>
</style>
