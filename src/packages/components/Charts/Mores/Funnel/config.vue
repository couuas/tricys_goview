<template>
    <CollapseItem
      name="朝向">
      <template #header>
        <n-switch
          checked-value="vertical"
          unchecked-value="horizontal"
          v-model:value="props.optionData.series.orient"
        >
          <template #checked>
            垂直
          </template>
          <template #unchecked>
            水平
          </template>
        </n-switch>
      </template>
    </CollapseItem>

    <CollapseItem
      name="排序">
      <template #header>
        <n-switch
          checked-value="descending"
          unchecked-value="ascending"
          v-model:value="props.optionData.series.sort"
        >
          <template #checked>
            降序
          </template>
          <template #unchecked>
            升序
          </template>
        </n-switch>
      </template>
    </CollapseItem>

    <CollapseItem
      name="间隔"
      :expanded="true">
      <n-slider v-model:value="props.optionData.series.gap" />
    </CollapseItem>
    <!-- Echarts 全局设置 --> 
  <global-setting :optionData="optionData" :in-chart="true"></global-setting>
</template>

<script setup lang="ts">
import {
  GlobalSetting,
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

</script>
