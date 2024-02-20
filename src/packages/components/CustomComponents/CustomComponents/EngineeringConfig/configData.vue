<template>
  <n-space vertical>
    <setting-item-box name="组态ID" :alone="true">
      <n-input-number v-model:value="props.customData.mapId" size="small" placeholder="请输入组态ID"/>
    </setting-item-box>
  </n-space>
</template>

<script lang="ts" setup>
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
</script>

<style lang="scss" scoped>
</style>
