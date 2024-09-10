<template>
  <n-space vertical>
    <setting-item-box name="标题" :alone="true">
      <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
    </setting-item-box>
    <setting-item-box name="昨日、上周和上月PUE参数" :alone="true">
      <n-input-number v-model:value="props.customData.id_1" size="small" placeholder="请输入" />
    </setting-item-box>
    <setting-item-box name="市总负载" :alone="true">
      <n-input-number v-model:value="props.customData.id_2" size="small" placeholder="请输入" />
    </setting-item-box>
    <setting-item-box name="IT用电负载" :alone="true">
      <n-input-number v-model:value="props.customData.id_3" size="small" placeholder="请输入" />
    </setting-item-box>
    <setting-item-box name="非IT用电负载" :alone="true">
      <n-input-number v-model:value="props.customData.id_4" size="small" placeholder="请输入" />
    </setting-item-box>
  </n-space>
</template>

<script lang="ts" setup>
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
</script>

<style lang="scss" scoped>
</style>
