<template>
  <CollapseItem name="Data Source" :expanded="true">
    <SettingItemBox name="Tricys Task">
      <SettingItem name="Task ID">
        <n-input v-model:value="localTaskId" size="small"></n-input>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="Variables">
      <SettingItem name="List (comma sep)">
        <n-input v-model:value="localVariables" size="small"></n-input>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="">
      <SettingItem name="">
        <n-button size="small" type="primary" @click="applyChanges" style="width: 100%">Apply Settings</n-button>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const localTaskId = ref(props.optionData.dataset.taskId)
const localVariables = ref(props.optionData.dataset.variables.join(','))

watch(() => props.optionData.dataset, (newDataset) => {
    localTaskId.value = newDataset.taskId;
    localVariables.value = newDataset.variables.join(',');
}, { deep: true })

const applyChanges = () => {
    props.optionData.dataset = {
        ...props.optionData.dataset,
        taskId: localTaskId.value,
        variables: localVariables.value.split(',').map(s => s.trim()).filter(s => s)
    }
}
</script>
