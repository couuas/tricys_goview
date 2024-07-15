<template>
  <setting-item-box name="标题" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="开启演示模式" :alone="true">
    <n-space>
      <n-switch v-model:value="props.customData.demonstration" size="small"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="区域温度测点(英文逗号隔开)" :alone="true">
    <n-input v-model:value="props.customData.ids" size="small" placeholder="请输入"/>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
</script>

<style lang="scss" scoped>
</style>
