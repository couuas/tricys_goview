<template>
  <setting-item-box name="数据映射 {&quot;k&quot;: &quot;v&quot;}" :alone="true">
    <n-input v-model:value="props.customData.dataMap" size="small" placeholder="请输入"/>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData'])
</script>

<style lang="scss" scoped>
</style>
