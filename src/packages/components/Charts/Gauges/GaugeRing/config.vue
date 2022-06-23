<template>
  <!-- 遍历 seriesList -->
  <CollapseItem :name="`圆环`" :expanded="true">
    <!-- <SettingItemBox name="数据样式">
      <SettingItem :name="item.name+'字体大小'" v-for="(item,index) in config.title" :key="index">
        <n-input-number v-model:value="item.textStyle.fontSize" :min="10" :step="1" size="small" placeholder="数值">
        </n-input-number>
      </SettingItem>
      <SettingItem :name="item.name+'字体宽度'" v-for="(item,index) in config.title" :key="index">
        <n-input-number v-model:value="item.textStyle.fontWeight" :min="100" :step="100" size="small" placeholder="数值">
        </n-input-number>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="进度条">
      <SettingItem name="前景色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="config.series[0].itemStyle.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="背景色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="config.series[0].backgroundStyle.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="外边框">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="config.series[1].itemStyle.borderColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="内边框">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="config.series[2].itemStyle.borderColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox> -->
    
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
