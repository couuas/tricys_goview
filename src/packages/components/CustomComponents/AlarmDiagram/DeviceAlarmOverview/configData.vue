<template>
  <setting-item-box name="标题" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入标题"/>
  </setting-item-box>
  <setting-item-box name="空间ID" :alone="true">
    <n-input v-model:value="props.customData.space_complete_id" size="small" placeholder="请输入空间ID"/>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
</script>

<style lang="scss" scoped>
</style>
