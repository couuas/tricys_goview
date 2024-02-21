<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem name="总配置" :expanded="true">
    <SettingItemBox name="" :alone="true">
      <n-text>修改此配置将覆盖全部系列配置</n-text>
    </SettingItemBox>
    <SettingItemBox name="Y轴索引">
      <setting-item>
        <n-select v-model:value="allSeriesConfig.yAxisIndex" :options="yAxisIndexOptions" size="small" />
      </setting-item>
    </SettingItemBox>
    <SettingItemBox name="图形">
      <SettingItem name="宽度">
        <n-input-number
          v-model:value="allSeriesConfig.barWidth"
          :min="1"
          :max="100"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="圆角">
        <n-input-number v-model:value="allSeriesConfig.itemStyle.borderRadius" :min="0" size="small"></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <setting-item-box name="标签">
      <setting-item>
        <n-space>
          <n-switch v-model:value="allSeriesConfig.label.show" size="small" />
          <n-text>展示标签</n-text>
        </n-space>
      </setting-item>
      <setting-item name="大小">
        <n-input-number v-model:value="allSeriesConfig.label.fontSize" size="small" :min="1"></n-input-number>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="allSeriesConfig.label.color"></n-color-picker>
      </setting-item>
      <setting-item name="位置">
        <n-select
          v-model:value="allSeriesConfig.label.position"
          :options="[
            { label: 'top', value: 'top' },
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
            { label: 'bottom', value: 'bottom' }
          ]"
        />
      </setting-item>
    </setting-item-box>
  </CollapseItem>
  <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`柱状图-${index + 1}`" :expanded="true">
    <template #header>
      <n-space align="center" :wrap="false">
        <n-button v-if="index !== 0" @click="handleDelete(index)" circle size="tiny">
          <template #icon>
            <n-icon><CloseIcon /></n-icon>
          </template>
        </n-button>
        <n-button v-if="index === seriesList.length - 1" @click="handleAdd" circle size="tiny">
          <template #icon>
            <n-icon><AddIcon /></n-icon>
          </template>
        </n-button>
      </n-space>
    </template>
    <SettingItemBox name="Y轴索引">
      <setting-item>
        <n-select v-model:value="item.yAxisIndex" :options="yAxisIndexOptions" size="small" />
      </setting-item>
    </SettingItemBox>
    <SettingItemBox name="图形">
      <SettingItem name="宽度">
        <n-input-number
          v-model:value="item.barWidth"
          :min="1"
          :max="100"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="圆角">
        <n-input-number v-model:value="item.itemStyle.borderRadius" :min="0" size="small"></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <setting-item-box name="标签">
      <setting-item>
        <n-space>
          <n-switch v-model:value="item.label.show" size="small" />
          <n-text>展示标签</n-text>
        </n-space>
      </setting-item>
      <setting-item name="大小">
        <n-input-number v-model:value="item.label.fontSize" size="small" :min="1"></n-input-number>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.label.color"></n-color-picker>
      </setting-item>
      <setting-item name="位置">
        <n-select
          v-model:value="item.label.position"
          :options="[
            { label: 'top', value: 'top' },
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
            { label: 'bottom', value: 'bottom' }
          ]"
        />
      </setting-item>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { seriesItem } from "./config";
import { cloneDeep } from "lodash";
import { icon } from "@/plugins";
const { CloseIcon, AddIcon } = icon.ionicons5

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})

// const allSeriesConfig: Ref<typeof seriesItem> = ref(cloneDeep(seriesItem))

const allSeriesConfig = computed(() => {
  return props.optionData.allSeriesConfig
})

const yAxisIndexOptions = [
  { label: 'Y轴-1', value: 0 },
  { label: 'Y轴-2', value: 1 },
]

const handleAdd = () => {
  props.optionData.series.push(cloneDeep(seriesItem))
}
const handleDelete = (i: number) => {
  props.optionData.series.splice(i, 1)
}

watch(() => allSeriesConfig.value, (v) => {
  seriesList.value.forEach((item: typeof seriesItem) => {
    Object.assign(item, cloneDeep(v))
  })
}, {
  deep: true,
  // immediate: true
})

watch(() => seriesList.value, (v) => {
  const isSame = v.every((_: typeof seriesItem) => {
    let flag = true
    let k: keyof typeof seriesItem
    for(k in _) {
      if(JSON.stringify(_[k]) !== JSON.stringify(v[0][k])) flag = false
    }
    return flag
  })
  if(isSame && JSON.stringify(v[0]) !== JSON.stringify(allSeriesConfig.value)) {
    Object.assign(allSeriesConfig.value, cloneDeep(v[0]))
  }
}, {
  deep: true,
  immediate: true
})
</script>
