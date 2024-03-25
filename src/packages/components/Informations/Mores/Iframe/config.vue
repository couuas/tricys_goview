<template>
  <collapse-item name="属性" :expanded="true">
    <setting-item-box name="路径" :alone="true">
      <setting-item name="请输入类似 https://a.com 或 http://a.com 并注意绕过浏览器同源策略">
        <n-input v-model:value="optionData.dataset" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="圆角">
        <n-input-number
          v-model:value="optionData.borderRadius"
          size="small"
          :min="0"
          placeholder="圆角"
        ></n-input-number>
      </setting-item>
    </setting-item-box>
    <SettingItemBox name="提示" alone>
      <n-text>双击全屏按钮可以全屏，全屏按钮可以拖拽</n-text>
    </SettingItemBox>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { option } from "./config";
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from "@/components/Pages/ChartItemSetting";

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
});
</script>
