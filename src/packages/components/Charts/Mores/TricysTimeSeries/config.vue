<template>
  <CollapseItem name="Data Source" :expanded="true">
    <SettingItemBox name="Tricys Task">
      <SettingItem name="Task ID">
        <n-input v-model:value="optionData.dataset.taskId" size="small"></n-input>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Variables">
      <SettingItem name="List (comma sep)">
        <!-- simple implementation for array input -->
        <n-input :value="optionData.dataset.variables.join(',')" @update:value="updateVariables" size="small"></n-input>
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

const updateVariables = (val: string) => {
    props.optionData.dataset.variables = val.split(',').map(s => s.trim()).filter(s => s)
}
</script>
