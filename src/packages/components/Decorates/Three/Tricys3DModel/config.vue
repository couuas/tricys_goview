<template>
  <CollapseItem name="3D Model" :expanded="true">
    <SettingItemBox name="Model Source">
      <SettingItem name="URL">
        <n-input v-model:value="optionData.dataset" size="small"></n-input>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Settings">
      <SettingItem name="Auto Rotate">
        <n-switch v-model:value="optionData.modelConfig.autoRotate" size="small"></n-switch>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
