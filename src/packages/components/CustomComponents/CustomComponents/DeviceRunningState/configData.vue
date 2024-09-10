<template>
  <setting-item-box name="标题" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="设备类型" :alone="true">
    <n-input v-model:value="props.customData.config" size="small" placeholder="请输入"/>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
</script>

<style lang="scss" scoped>
</style>
