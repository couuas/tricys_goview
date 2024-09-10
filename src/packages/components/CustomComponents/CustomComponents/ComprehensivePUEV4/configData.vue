<template>
  <setting-item-box name="标题" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="启用">
    <n-space>
      <n-switch v-model:value="props.customData.enable" size="small"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="模式" alone>
    <n-space >
      <n-radio
        :checked="checkedValue === 'normal'"
        value="normal"
        name="mode"
        @change="handleChange"
      >普通模式</n-radio>
      <n-radio
        :checked="checkedValue === 'demonstration'"
        value="demonstration"
        name="mode"
        @change="handleChange"
      >演示模式</n-radio>
      <n-radio
        :checked="checkedValue === 'manual'"
        value="manual"
        name="mode"
        @change="handleChange"
      >手动模式</n-radio>
    </n-space>
  </setting-item-box>
  <template v-if="checkedValue === 'normal'">
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
  <template v-else-if="checkedValue === 'manual'">
    <setting-item-box name="仪表盘">
      <setting-item :name="props.customData.circle.title">
        <n-input-number v-model:value="props.customData.circle.value" step="0.001" size="small" placeholder="请输入"/>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="中间">
      <setting-item :name="props.customData.center.title1">
        <n-input-number v-model:value="props.customData.center.value1" step="0.001" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="props.customData.center.title2">
        <n-input-number v-model:value="props.customData.center.value2" step="0.001" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="props.customData.center.title3">
        <n-input-number v-model:value="props.customData.center.value3" step="0.001" size="small" placeholder="请输入"/>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="右边">
      <setting-item :name="props.customData.right.title1">
        <n-input-number v-model:value="props.customData.right.value1" step="0.001" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="props.customData.right.title2">
        <n-input-number v-model:value="props.customData.right.value2" step="0.001" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="props.customData.right.title3">
        <n-input-number v-model:value="props.customData.right.value3" step="0.001" size="small" placeholder="请输入"/>
      </setting-item>
    </setting-item-box>
  </template>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])

const checkedValue = ref('normal')

if(props.customData.demonstration) checkedValue.value = 'demonstration'
if(props.customData.manual) checkedValue.value = 'manual'

const handleChange = (e: Event) => {
  checkedValue.value = (e.target as HTMLInputElement).value
  if(checkedValue.value === 'normal') {
    props.customData.demonstration = false
    props.customData.manual = false
  }
  else if(checkedValue.value === 'demonstration') {
    props.customData.demonstration = true
    props.customData.manual = false
  }
  else if(checkedValue.value === 'manual') {
    props.customData.demonstration = false
    props.customData.manual = true
  }
}
</script>

<style lang="scss" scoped>
</style>
