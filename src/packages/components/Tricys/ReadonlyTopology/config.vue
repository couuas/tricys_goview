<template>
  <CollapseItem name="Tricys 3D Topology" :expanded="true">
    <SettingItemBox name="Display">
      <SettingItem name="Title">
        <n-input v-model:value="optionData.dataset.title" size="small" />
      </SettingItem>
      <SettingItem name="Subtitle">
        <n-input v-model:value="optionData.dataset.subtitle" size="small" />
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Project Context">
      <SettingItem name="Project ID">
        <n-input v-model:value="optionData.dataset.projectId" size="small" placeholder="留空时使用当前项目" />
      </SettingItem>
      <SettingItem name="Task ID">
        <n-input v-model:value="optionData.dataset.taskId" size="small" placeholder="后续接入仿真任务" />
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="Scene">
      <SettingItem name="Auto Rotate">
        <n-switch v-model:value="optionData.scene.autoRotate" size="small" />
      </SettingItem>
      <SettingItem name="Show Grid">
        <n-switch v-model:value="optionData.scene.showGrid" size="small" />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>