<template>
  <!-- 遍历 seriesList -->
  <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`圆环-${index + 1}`" :expanded="true">
    <SettingItemBox name="数据">
      <SettingItem name="数值">
        <n-input-number v-model:value="item.data[0].value" :min="0" :step="0.01" size="small" placeholder="数值">
        </n-input-number>
      </SettingItem>
    </SettingItemBox>
    <!-- Echarts 全局设置 -->
    <SettingItemBox name="样式">
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.data[0].itemStyle.normal.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="阴影模糊等级">
        <n-input-number v-model:value="item.data[0].itemStyle.normal.shadowBlur" :min="0" :step="1" size="small" placeholder="阴影模糊等级">
        </n-input-number>
      </SettingItem>
      <SettingItem name="阴影颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.data[0].itemStyle.normal.shadowColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <!-- 中心标题 -->
    <SettingItemBox name="标题">
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="title.textStyle.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="字体大小">
        <n-input-number v-model:value="title.textStyle.fontSize" :min="0" :step="1" size="small" placeholder="字体大小">
        </n-input-number>
      </SettingItem>
    </SettingItemBox>
    <!-- 其他样式 -->
    <SettingItemBox name="其它样式">
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.data[1].itemStyle.normal.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="阴影模糊等级">
        <n-input-number v-model:value="item.data[1].itemStyle.normal.shadowBlur" :min="0" :step="1" size="small" placeholder="阴影模糊等级">
        </n-input-number>
      </SettingItem>
      <SettingItem name="阴影颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.data[1].itemStyle.normal.shadowColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData" :in-chart="true"></global-setting>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import {
  GlobalSetting,
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  },
  title: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})

const title = computed(() => {
  return props.optionData.title
})
</script>
