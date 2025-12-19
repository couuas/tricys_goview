<template>
  <!-- 默认展开 -->
  <CollapseItem name="样式" :expanded="true">
    <SettingItemBox name="边框">
      <SettingItem name="圆角">
        <!-- 与 config.ts 里的 option 对应 -->
        <!-- n-input-number 是 NaiveUI 的控件 -->
        <n-input-number
          v-model:value="optionData.options1"
          size="small"
          :min="0"
          placeholder="日历圆角"
        ></n-input-number>
      </SettingItem>
      <!-- 颜色粗细等等... -->
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const optionData = computed(() => props.chartConfig.option)
</script>