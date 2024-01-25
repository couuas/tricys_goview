<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="singlePoint.enable"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="测点ID" :alone="true">
    <n-input
      v-model:value="singlePoint.pointId"
      placeholder="请输入测点ID"
      size="small"
      clearable
    />
  </setting-item-box>
</template>

<script setup lang="ts">
import { useTargetData } from "../../hooks/useTargetData.hook";
import { computed } from 'vue'
import type { Ref } from "vue";
import { commonDataType, SinglePointType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'


const { targetData } = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }
const singlePoint: Ref<SinglePointType> = computed(() => targetData.value.commonData.singlePoint)

</script>

<style lang="scss" scoped>

</style>