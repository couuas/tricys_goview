<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem name="总配置" :expanded="true">
    <SettingItemBox name="" :alone="true">
      <n-text>修改此配置将覆盖全部折线配置</n-text>
    </SettingItemBox>
    <SettingItemBox name="线条">
      <setting-item>
        <n-space>
          <n-switch v-model:value="allSeriesConfig.smooth" size="small" />
          <n-text>平滑曲线</n-text>
        </n-space>
      </setting-item>
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="allSeriesConfig.lineStyle.color.colorStops[0].color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="allSeriesConfig.lineStyle.color.colorStops[1].color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="宽度">
        <n-input-number
          v-model:value="allSeriesConfig.lineStyle.width"
          :min="1"
          :max="100"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="类型">
        <n-select
          v-model:value="allSeriesConfig.lineStyle.type"
          size="small"
          :options="lineConf.lineStyle.type"
        ></n-select>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="实心点">
      <SettingItem name="大小">
        <n-input-number
          v-model:value="allSeriesConfig.symbolSize"
          :min="0"
          :max="100"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="阴影" :alone="true">
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="allSeriesConfig.lineStyle.shadowColor"
        ></n-color-picker>
      </SettingItem>

    </SettingItemBox>
    <SettingItemBox name="设置">
      <SettingItem name="阴影">
        <n-button
          size="small"
          @click="allSeriesConfig.lineStyle.shadowColor = 'rgba(0, 0, 0, 0)'"
        >
          去除阴影
        </n-button>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
  <CollapseItem
    v-for="(item, index) in seriesList"
    :key="index"
    :name="`折线图-${index + 1}`"
    :expanded="true"
  >
    <SettingItemBox name="线条">
      <setting-item>
        <n-space>
          <n-switch v-model:value="item.smooth" size="small" />
          <n-text>平滑曲线</n-text>
        </n-space>
      </setting-item>
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.lineStyle.color.colorStops[0].color"
       ></n-color-picker>
      </SettingItem>
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.lineStyle.color.colorStops[1].color"
       ></n-color-picker>
      </SettingItem>
      <SettingItem name="宽度">
        <n-input-number
          v-model:value="item.lineStyle.width"
          :min="1"
          :max="100"
          size="small"
          placeholder="自动计算"
       ></n-input-number>
      </SettingItem>
      <SettingItem name="类型">
        <n-select
          v-model:value="item.lineStyle.type"
          size="small"
          :options="lineConf.lineStyle.type"
       ></n-select>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="实心点">
      <SettingItem name="大小">
        <n-input-number
          v-model:value="item.symbolSize"
          :min="0"
          :max="100"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="阴影" :alone="true">
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.lineStyle.shadowColor"
      ></n-color-picker>
      </SettingItem>

    </SettingItemBox>
    <SettingItemBox name="设置">
     <SettingItem name="阴影">
        <n-button
          size="small"
          @click="item.lineStyle.shadowColor = 'rgba(0, 0, 0, 0)'"
        >
          去除阴影
        </n-button>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { lineConf } from '@/packages/chartConfiguration/echarts/index'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import {
  GlobalSetting,
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
import { seriesItem } from "./config";
import { cloneDeep } from "lodash";

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})

const allSeriesConfig: Ref<typeof seriesItem> = ref(cloneDeep(seriesItem))

watch(() => allSeriesConfig.value, (v) => {
  seriesList.value.forEach((item: typeof seriesItem) => {
    Object.assign(item, cloneDeep(v))
  })
}, {
  deep: true,
  immediate: true
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
