<template>
  <CollapseItem name="组态" :expanded="true">
    <SettingItemBox name="位置">
      <SettingItem name="距离顶部">
        <n-input-number
          v-model:value="optionData.top"
          size="small"
          placeholder="请输入"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="距离左侧">
        <n-input-number
          v-model:value="optionData.left"
          size="small"
          placeholder="请输入"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="缩放">
        <n-input-number
          v-model:value="optionData.scale"
          size="small"
          placeholder="请输入"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="标题">
      <SettingItem name="如果有将展示">
        <n-switch v-model:value="optionData.isThereATitleComponet" size="small" />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
})
</script>

<style lang="scss" scoped>

</style>