<template>
  <CollapseItem name="组态" :expanded="true">
    <SettingItemBox name="标题">
      <SettingItem name="如果有标题将展示">
        <n-space justify="start">
          <n-switch v-model:value="optionData.isThereATitleComponet" size="small" />
        </n-space>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="快捷输入" :alone="true">
      <SettingItem name="输入0,0,1相当于距离顶部0,距离左侧0,缩放为1">
        <n-input
          v-model:value="allValue"
          size="small"
          placeholder="请输入"
        ></n-input>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="位置">
      <SettingItem name="距离顶部">
        <n-input-number
          v-model:value="optionData.top"
          size="small"
          placeholder="请输入"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="距离左侧">
        <n-input-number
          v-model:value="optionData.left"
          size="small"
          placeholder="请输入"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="缩放">
        <n-input-number
          v-model:value="optionData.scale"
          step="0.1"
          size="small"
          placeholder="请输入"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="提示" :alone="true">
      <n-text>在预览页使用alt+滚轮进行缩放</n-text>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
})

const allValue = ref('')

watch(() => allValue.value, v => {
  v.split(',').forEach((item, i) => {
    if(!isNaN(Number(item)) && item !== '') {
      if(i === 0) props.optionData.top = Number(item)
      else if(i === 1) props.optionData.left = Number(item)
      else if(i === 2) props.optionData.scale = Number(item)
    }
  })
})
</script>

<style lang="scss" scoped>

</style>