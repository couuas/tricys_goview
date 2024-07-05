<template>
<!--  <CollapseItem :name="`仪表盘`" :expanded="true">-->
<!--    <SettingItemBox name="数据">-->
<!--      <SettingItem>-->
<!--        <n-space>-->
<!--          <n-switch v-model:value="config.showUnit" size="small" />-->
<!--          <n-text>展示单位</n-text>-->
<!--        </n-space>-->
<!--      </SettingItem>-->
<!--      <SettingItem name="最大值">-->
<!--        <n-input-number v-model:value="config.max" placeholder="请输入最大值" size="small" clearable/>-->
<!--      </SettingItem>-->
<!--      <SettingItem name="最小值">-->
<!--        <n-input-number v-model:value="config.min" placeholder="请输入最小值" size="small" clearable/>-->
<!--      </SettingItem>-->
<!--      <SettingItem name="字体大小">-->
<!--        <n-input-number v-model:value="config.titleFontSize" placeholder="请输入字体大小" size="small" clearable/>-->
<!--      </SettingItem>-->
<!--      <SettingItem name="颜色">-->
<!--        <n-color-picker size="small" :modes="['hex']" v-model:value="config.titleColor"></n-color-picker>-->
<!--      </SettingItem>-->
<!--    </SettingItemBox>-->
<!--    <SettingItemBox name="副标题">-->
<!--      <SettingItem>-->
<!--        <n-space>-->
<!--          <n-switch v-model:value="config.showSubtext" size="small" />-->
<!--          <n-text>展示副标题</n-text>-->
<!--        </n-space>-->
<!--      </SettingItem>-->
<!--      <SettingItem>-->
<!--        <n-space>-->
<!--          <n-switch v-model:value="config.showSubtextUnit" size="small" />-->
<!--          <n-text>展示单位</n-text>-->
<!--        </n-space>-->
<!--      </SettingItem>-->
<!--      <SettingItem name="字体大小">-->
<!--        <n-input-number v-model:value="config.subtextFontSize" placeholder="请输入字体大小" size="small" clearable/>-->
<!--      </SettingItem>-->
<!--      <SettingItem name="颜色">-->
<!--        <n-color-picker size="small" :modes="['hex']" v-model:value="config.subtextColor"></n-color-picker>-->
<!--      </SettingItem>-->
<!--    </SettingItemBox>-->
<!--  </CollapseItem>-->
</template>

<script setup lang="ts">
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import {computed, PropType} from "vue";
import {GlobalThemeJsonType} from "@/settings/chartThemes";

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const config = computed(() => {
  return props.optionData
});
</script>

<style lang="scss" scoped>

</style>