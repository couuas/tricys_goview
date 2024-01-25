<template>
  <!-- 遍历 seriesList -->
  <CollapseItem v-for="(item, index) in config.series" :key="index" :name="`圆环`" :expanded="true">
    <SettingItemBox name="数据">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="config.titleContrl.showPercent" size="small" />
          <n-text>是否百分比</n-text>
        </n-space>
      </SettingItem>
      <SettingItem v-if="!config.titleContrl.showPercent" name="最大值">
        <n-input-number v-model:value="config.titleContrl.max" :min="0" :step="1" size="small" placeholder="请输入最大值"/>
      </SettingItem>
      <SettingItem v-if="!config.titleContrl.showPercent">
        <n-space>
          <n-switch v-model:value="config.titleContrl.showUnit" size="small" />
          <n-text>展示单位</n-text>
        </n-space>
      </SettingItem>
      <SettingItem name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="config.title.textStyle.color"></n-color-picker>
      </SettingItem>
      <SettingItem name="字体大小">
        <n-input-number
            v-model:value="config.title.textStyle.fontSize"
            :min="0"
            :step="1"
            size="small"
            placeholder="字体大小"
        >
        </n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="副标题">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="config.titleContrl.showSubText" size="small" />
          <n-text>展示副标题</n-text>
        </n-space>
      </SettingItem>
      <SettingItem>
        <n-space>
          <n-switch v-model:value="config.titleContrl.showSubTextUnit" size="small" />
          <n-text>展示单位</n-text>
        </n-space>
      </SettingItem>
      <SettingItem name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="config.title.subtextStyle.color"></n-color-picker>
      </SettingItem>
      <SettingItem name="字体大小">
        <n-input-number
          v-model:value="config.title.subtextStyle.fontSize"
          :min="0"
          :step="1"
          size="small"
          placeholder="字体大小"
        >
        </n-input-number>
      </SettingItem>
    </SettingItemBox>
    <!-- Echarts 全局设置 -->
    <SettingItemBox name="进度条">
      <SettingItem name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.data[0].itemStyle.color"></n-color-picker>
      </SettingItem>
      <SettingItem name="阴影模糊等级">
        <n-input-number
          v-model:value="item.data[0].itemStyle.shadowBlur"
          :min="0"
          :max="50"
          :step="1"
          size="small"
          placeholder="阴影模糊等级"
        >
        </n-input-number>
      </SettingItem>
      <SettingItem name="阴影颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.data[0].itemStyle.shadowColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <!-- 其他样式 -->
    <SettingItemBox name="轨道">
      <SettingItem name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.data[1].itemStyle.color"></n-color-picker>
      </SettingItem>
      <SettingItem name="阴影模糊等级">
        <n-input-number
          v-model:value="item.data[1].itemStyle.shadowBlur"
          :min="0"
          :step="1"
          size="small"
          placeholder="阴影模糊等级"
        >
        </n-input-number>
      </SettingItem>
      <SettingItem name="阴影颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.data[1].itemStyle.shadowColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem name="轨道宽度">
        <n-select
          v-model:value="item.radius[0]"
          size="small"
          :options="[
            { label: '窄', value: '75%' },
            { label: '中', value: '60%' },
            { label: '宽', value: '45%' },
            { label: '更宽', value: '30%' }
          ]"
        />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes'

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
