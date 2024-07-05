<template>
  <setting-item-box name="标题" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="启用数据">
    <n-space>
      <n-switch v-model:value="props.customData.enable" />
    </n-space>
  </setting-item-box>
  <setting-item-box name="上半部分">
    <setting-item name="名称">
      <n-input v-model:value="props.customData.topBox.name" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="设计容量名称">
      <n-input v-model:value="props.customData.topBox.label" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="设计容量值">
      <n-input-number v-model:value="props.customData.topBox.value" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="总功率名称">
      <n-input v-model:value="props.customData.topBox.label1" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="总功率公式">
      <n-input v-model:value="props.customData.topBox.calculation" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="总功率公式名">
      <n-input v-model:value="props.customData.topBox.name1" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="总功率upper_limit 为0忽略">
      <n-input v-model:value="props.customData.topBox.upper_limit" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name=""/>
    <template v-for="(it, i) in props.customData.topBox.floor" :key="i">
      <setting-item :name="`楼层名字-${i + 1}`">
        <n-input v-model:value="it.label" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="`计算公式-${i + 1}`">
        <n-input v-model:value="it.calculation" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="`计算公式名-${i + 1}`">
        <n-input v-model:value="it.name" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="`upper_limit-${i + 1} 为0忽略`">
        <n-input-number v-model:value="it.upper_limit" size="small" placeholder="请输入"/>
      </setting-item>
    </template>
  </setting-item-box>
  <setting-item-box name="下半部分">
    <setting-item name="名称">
      <n-input v-model:value="props.customData.bottomBox.name" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="设计容量名称">
      <n-input v-model:value="props.customData.bottomBox.label" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="设计容量值">
      <n-input-number v-model:value="props.customData.bottomBox.value" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="总功率名称">
      <n-input v-model:value="props.customData.bottomBox.label1" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="总功率公式">
      <n-input v-model:value="props.customData.bottomBox.calculation" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="总功率公式名">
      <n-input v-model:value="props.customData.bottomBox.name1" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="总功率upper_limit 为0忽略">
      <n-input v-model:value="props.customData.bottomBox.upper_limit" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name=""/>
    <template v-for="(it, i) in props.customData.bottomBox.floor" :key="i">
      <setting-item :name="`楼层名字-${i + 1}`">
        <n-input v-model:value="it.label" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="`计算公式-${i + 1}`">
        <n-input v-model:value="it.calculation" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="`计算公式名-${i + 1}`">
        <n-input v-model:value="it.name" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="`upper_limit-${i + 1} 为0忽略`">
        <n-input-number v-model:value="it.upper_limit" size="small" placeholder="请输入"/>
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
