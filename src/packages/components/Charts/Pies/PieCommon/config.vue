<template>
  <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`圆环-${index + 1}`" :expanded="true">
    <SettingItemBox name="半径">
      <SettingItem name="内半径">
        <n-input-number v-model:value="item.radius[0]" :min="0" :step="1" size="small" placeholder="内半径">
        </n-input-number>
      </SettingItem>
      <SettingItem name="外半径">
        <n-input-number v-model:value="item.radius[1]" :min="0" :step="1" size="small" placeholder="外半径">
        </n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="边框">
      <SettingItem name="半径">
        <n-input-number v-model:value="item.itemStyle.borderRadius" :min="0" :step="1" size="small" placeholder="边框半径">
        </n-input-number>
      </SettingItem>
      <SettingItem name="宽度">
        <n-input-number v-model:value="item.itemStyle.borderWidth" :min="0" :step="1" size="small" placeholder="边框宽度">
        </n-input-number>
      </SettingItem>
      <SettingItem name="样式">
        <n-select v-model:value="item.itemStyle.borderType" :options="borderTypes" placeholder="选择边框样式" />
      </SettingItem>
      <SettingItem name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.itemStyle.borderColor"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="阴影">
      <SettingItem name="模糊级数">
        <n-input-number v-model:value="item.itemStyle.shadowBlur" :min="0" :step="1" size="small" placeholder="阴影范围">
        </n-input-number>
      </SettingItem>
      <SettingItem name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.itemStyle.shadowColor"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="扇区颜色">
      <SettingItem :name="'颜色' + index" v-for="(_, index) in item.color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.color[index]"></n-color-picker>
      </SettingItem>
      <SettingItem>
        <n-button
          size="small"
          @click="optionData.series[0].color = option.series[0].color"
        >
          恢复默认
        </n-button>
      </SettingItem>
    </SettingItemBox>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData" :in-chart="true"></global-setting>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import {
  GlobalSetting,
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})

const borderTypes = [
  {
    label: '实线',
    value: 'solid'
  },
  {
    label: '虚线',
    value: 'dashed'
  },
  {
    label: '点状',
    value: 'dotted'
  }
]
</script>
