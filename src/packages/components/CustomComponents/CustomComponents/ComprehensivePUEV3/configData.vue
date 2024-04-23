<template>
  <setting-item-box name="标题" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="启用数据">
    <n-space justify="start">
      <n-switch v-model:value="props.customData.enable" size="small"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="仪表盘">
    <setting-item name="标题">
      <n-input v-model:value="props.customData.circle.title" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="报表id">
      <n-input v-model:value="props.customData.circle.id" size="small" placeholder="请输入"/>
    </setting-item>
  </setting-item-box>
  <setting-item-box name="左下部分">
    <setting-item name="标题1">
      <n-input v-model:value="props.customData.leftBottom[1].title" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="报表id1">
      <n-input v-model:value="props.customData.leftBottom[1].id" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="标题2">
      <n-input v-model:value="props.customData.leftBottom[0].title" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="报表id2">
      <n-input v-model:value="props.customData.leftBottom[0].id" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="标题3">
      <n-input v-model:value="props.customData.leftBottom[2].title" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="报表id3">
      <n-input v-model:value="props.customData.leftBottom[2].id" size="small" placeholder="请输入"/>
    </setting-item>
  </setting-item-box>
  <setting-item-box name="右半部分">
    <template v-for="i in 3" :key="i">
      <setting-item :name="'标题' + i">
        <n-input v-model:value="props.customData.right[i - 1].title" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="'单位' + i">
        <n-input v-model:value="props.customData.right[i - 1].unit" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="'报表id' + i">
        <n-input v-model:value="props.customData.right[i - 1].id" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item name="">
      </setting-item>
    </template>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
</script>

<style lang="scss" scoped>
</style>
