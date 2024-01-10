<template>
  <n-space vertical>
    <setting-item-box name="标题" :alone="true">
      <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
    </setting-item-box>
  </n-space>
</template>

<script lang="ts" setup>
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])
</script>

<style lang="scss" scoped>
</style>
