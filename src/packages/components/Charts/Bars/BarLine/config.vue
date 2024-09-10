<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem
    v-for="(item, index) in seriesList"
    :key="index"
    :name="`${item.type == 'bar' ? `柱状图-${index + 1}` : `折线图-${index + 1}`}`"
    :expanded="true"
  >
    <template #header>
      <n-space align="center" :wrap="false">
        <n-button v-if="index !== 0" @click="handleDelete(index)" circle size="tiny">
          <template #icon>
            <n-icon><CloseIcon /></n-icon>
          </template>
        </n-button>
        <n-dropdown v-if="index === seriesList.length - 1" trigger="hover" :options="options" @select="handleSelect">
          <n-button circle size="tiny">
            <template #icon>
              <n-icon><AddIcon /></n-icon>
            </template>
          </n-button>
        </n-dropdown>
      </n-space>
    </template>
    <SettingItemBox name="类型">
      <setting-item name="">
        <n-select
          :value="item.type"
          :options="[
            { label: '柱状图', value: 'bar' },
            { label: '折线图', value: 'line' },
          ]"
          :onUpdate:value="(v:string) => changeType(v, index)"
        />
      </setting-item>
    </SettingItemBox>
    <SettingItemBox name="图形" v-if="item.type == 'bar'">
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
    <SettingItemBox name="线条" v-if="item.type == 'line'">
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
        <n-select v-model:value="item.lineStyle.type" size="small" :options="lineConf.lineStyle.type"></n-select>
      </SettingItem>
      <setting-item>
        <n-space>
          <n-switch v-model:value="item.smooth" size="small" />
          <n-text>曲线</n-text>
        </n-space>
      </setting-item>
    </SettingItemBox>
    <SettingItemBox name="实心点" v-if="item.type == 'line'">
      <SettingItem name="大小">
        <n-input-number
          v-model:value="item.symbolSize"
          :min="1"
          :max="100"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
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
      <setting-item name="tip颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.label.color"></n-color-picker>
      </setting-item>
      <setting-item name="位置">
        <n-select
          v-model:value="item.label.position"
          :options="[
            { label: '顶部', value: 'top' },
            { label: '左侧', value: 'left' },
            { label: '右侧', value: 'right' },
            { label: '底部', value: 'bottom' }
          ]"
        />
      </setting-item>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { lineConf } from '@/packages/chartConfiguration/echarts'
import { GlobalThemeJsonType } from '@/settings/chartThemes'
import {barSeriesItem, lineSeriesItem} from './config'
import {cloneDeep} from "lodash";
import {icon} from "@/plugins";
const { CloseIcon, AddIcon } = icon.ionicons5

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const options = ref([
  {
    label: '柱状图',
    key: 'bar',
  },
  {
    label: '折线图',
    key: 'line'
  },
])

const handleSelect = (key: string) => {
  handleAdd(key === 'bar' ? cloneDeep(barSeriesItem) : cloneDeep(lineSeriesItem))
}

const seriesList = computed(() => {
  return props.optionData.series
})

const handleAdd = (seriesItem: any) => {
  props.optionData.series.push(cloneDeep(seriesItem))
}
const handleDelete = (i: number) => {
  props.optionData.series.splice(i, 1)
}
const changeType = (type: string, i: number) => {
  props.optionData.series[i] = type === 'bar' ? cloneDeep(barSeriesItem) : cloneDeep(lineSeriesItem)
}
</script>
