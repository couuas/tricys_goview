<template>
  <n-space vertical>
    <setting-item-box name="标题" :alone="true">
      <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
    </setting-item-box>
    <setting-item-box name="数据源" :alone="true">
        <n-select v-model:value="props.customData.currentSource" :options="multipleSourceOptions" size="small"/>
      </setting-item-box>
  </n-space>
</template>

<script lang="ts" setup>
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
const multipleSourceOptions = [
  {
    label: '配电设备',
    value:'device'
  },
  {
    label: 'IT设备',
    value:'IT'
  },

]
</script>

<style lang="scss" scoped>
</style>
