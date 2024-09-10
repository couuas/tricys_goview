<template>
  <setting-item-box name="分类编码（多个编码使用英文逗号分隔）" :alone="true">
    <n-input v-model:value="currentObj.device_codes" size="small" placeholder="请输入" />
  </setting-item-box>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Ref } from 'vue'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../../hooks/useTargetData.hook'
import { commonDataType, AreaDevCountType } from '@/store/modules/chartEditStore/chartEditStore.d'
const { targetData } = useTargetData() as { targetData: Ref<{ commonData: commonDataType; id: string }> }

const currentObj = computed(() => {
  return targetData.value.commonData[targetData.value.commonData.currentSource] as AreaDevCountType
})
console.log(targetData, 'targetData')
</script>

<style lang="scss" scoped></style>
