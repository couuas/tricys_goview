<template>
  <CollapseItem name="属性配置" :expanded="true">
    <n-form label-placement="left" label-align="right" label-width="auto">
      <n-form-item  label="可清空">
        <n-switch v-model:value="inputOption.clearable"></n-switch>
      </n-form-item>
      <n-form-item  label="最大长度">
        <n-input-number v-model:value="inputOption.maxlength" :min="0" :max="200" :precision="0"/>
      </n-form-item>
      <n-form-item  label="placeholder">
        <n-input v-model:value="inputOption.placeholder"/>
      </n-form-item>
      <n-form-item  label="圆角">
        <n-switch v-model:value="inputOption.round"></n-switch>
      </n-form-item>
      <n-form-item  label="显示字数统计">
        <n-switch v-model:value="inputOption.showCount"></n-switch>
      </n-form-item>
      <n-form-item  label="尺寸">
        <n-select v-model:value="inputOption.size" :options="mapToOptions(componentSizeMap)"></n-select>
      </n-form-item>
    </n-form>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { mapToOptions } from '@/utils';
import { componentSizeMap } from '@/enums/componentEnum'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const { inputOption } = toRefs(props.optionData)

</script>

<style></style>
