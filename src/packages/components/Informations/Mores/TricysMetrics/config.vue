<template>
  <CollapseItem name="Data Source" :expanded="true">
    <SettingItemBox name="Tricys Task">
      <SettingItem name="Task ID">
        <n-input v-model:value="optionData.dataset.taskId" size="small" placeholder="留空时使用当前项目最新任务"></n-input>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Metrics">
      <SettingItem name="Keys (comma sep)">
        <n-input :value="optionData.dataset.metrics.join(',')" @update:value="updateMetrics" size="small"></n-input>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Style">
      <SettingItem name="Font Size">
         <n-input-number v-model:value="optionData.style.fontSize" size="small" :min="12"></n-input-number>
      </SettingItem>
       <SettingItem name="Item Gap">
         <n-input-number v-model:value="optionData.style.itemGap" size="small" :min="0"></n-input-number>
      </SettingItem>
      <SettingItem name="Color">
         <n-color-picker v-model:value="optionData.style.color" size="small"></n-color-picker>
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

const updateMetrics = (val: string) => {
    props.optionData.dataset.metrics = val.split(',').map(s => s.trim()).filter(s => s)
}
</script>
