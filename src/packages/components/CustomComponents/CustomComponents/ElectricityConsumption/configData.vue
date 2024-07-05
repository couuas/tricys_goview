<template>
  <setting-item-box name="标题1" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="标题2" :alone="true">
    <n-input v-model:value="props.customData.title1" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="标题3" :alone="true">
    <n-input v-model:value="props.customData.title2" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="启用数据">
    <n-space>
      <n-switch v-model:value="props.customData.enable" />
    </n-space>
  </setting-item-box>
  <setting-item-box name="柱1-ID" :alone="true">
    <n-input-number v-model:value="props.customData.barId1" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="柱1-名字" :alone="true">
    <n-input v-model:value="props.customData.barName1" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="柱2-ID" :alone="true">
    <n-input-number v-model:value="props.customData.barId2" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="柱2-名字" :alone="true">
    <n-input v-model:value="props.customData.barName1" size="small" placeholder="请输入"/>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
</script>

<style lang="scss" scoped>
</style>
