<template>
  <setting-item-box name="标题" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="空间ID" :alone="true">
    <n-input v-model:value="props.customData.space_complete_id" size="small" placeholder="请输入空间ID"/>
  </setting-item-box>
  <setting-item-box name="通过测点编码筛选(多个编码使用英文逗号分隔)" :alone="true">
    <n-input v-model:value="props.customData.dems_device_point_signal_ids" size="small" placeholder="请输入测点编码筛选(多个编码使用英文逗号分隔)"/>
  </setting-item-box>
  <setting-item-box name="显示筛选条件" :alone="true">
    <n-radio-group v-model:value="props.customData.showFilter" size="small" style="margin-top: 2px">
      <n-radio :value="true">是</n-radio>
      <n-radio :value="false">否</n-radio>
    </n-radio-group>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
</script>

<style lang="scss" scoped>
</style>
