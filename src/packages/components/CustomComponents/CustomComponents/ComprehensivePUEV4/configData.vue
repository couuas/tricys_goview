<template>
  <setting-item-box name="标题" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="启用">
    <n-space>
      <n-switch v-model:value="props.customData.enable" size="small"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="报表ID" alone>
    <setting-item name="控制左边和中间的ID">
      <n-input v-model:value="props.customData.id" size="small" placeholder="请输入"/>
    </setting-item>
  </setting-item-box>
  <setting-item-box name="仪表盘">
    <setting-item name="标题">
      <n-input v-model:value="props.customData.circle.title" size="small" placeholder="请输入"/>
    </setting-item>
  </setting-item-box>
  <setting-item-box name="中间">
    <setting-item name="标题1">
      <n-input v-model:value="props.customData.center.title1" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="标题2">
      <n-input v-model:value="props.customData.center.title2" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="标题3">
      <n-input v-model:value="props.customData.center.title3" size="small" placeholder="请输入"/>
    </setting-item>
  </setting-item-box>
  <setting-item-box name="右边">
    <setting-item name="标题1">
      <n-input v-model:value="props.customData.right.title1" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="测点计算公式1">
      <n-input v-model:value="props.customData.right.calculation1" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="标题2">
      <n-input v-model:value="props.customData.right.title2" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="测点计算公式2">
      <n-input v-model:value="props.customData.right.calculation2" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="标题3">
      <n-input v-model:value="props.customData.right.title3" size="small" placeholder="请输入"/>
    </setting-item>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
</script>

<style lang="scss" scoped>
</style>
