<template>
  <!-- 遍历 seriesList -->
  <global-setting :optionData="optionData" :in-chart="true"></global-setting>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import {
  GlobalSetting
} from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

// 去除options中的yAxis配置，不允许前端控制该属性
const optionData = computed(() => {
  const { yAxis, ...rest } = props.optionData
  return rest
})

</script>