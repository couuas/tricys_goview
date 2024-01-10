<template>
  <n-space vertical>
    <setting-item-box name="地图ID" :alone="true">
      <n-input-number v-model:value="props.customData.mapId" size="small" placeholder="请输入地图ID"/>
    </setting-item-box>
  </n-space>
</template>

<script lang="ts" setup>
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
</script>

<style lang="scss" scoped>
</style>
