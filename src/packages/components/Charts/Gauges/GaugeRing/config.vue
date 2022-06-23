<template>
  <!-- 遍历 seriesList -->
  <CollapseItem :name="`圆环`" :expanded="true">
    <SettingItemBox name="样式">
      <SettingItem name="环宽度">
        <n-input-number v-model:value="config.series[0].axisLine.lineStyle.width" :min="10" :step="1" size="small" placeholder="数值">
        </n-input-number>
      </SettingItem>
      <SettingItem name="字体大小">
        <n-input-number v-model:value="config.series[0].detail.fontSize" :min="10" :step="1" size="small" placeholder="数值">
        </n-input-number>
      </SettingItem>
      <SettingItem name="环颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="config.series[0].progress.itemStyle.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="字颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="config.series[0].detail.color"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/cartThemes'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const config = computed(() => {
  return props.optionData
})
</script>
