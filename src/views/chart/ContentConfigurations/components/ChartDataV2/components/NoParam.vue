<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="currentObj.enable"/>
    </n-space>
  </setting-item-box>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import type {Ref} from 'vue'
import {SettingItemBox} from '@/components/Pages/ChartItemSetting'
import {useTargetData} from '../../hooks/useTargetData.hook'
import {commonDataType} from '@/store/modules/chartEditStore/chartEditStore.d'
const {targetData} = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }

const currentObj = computed(() => {
  return targetData.value.commonData[targetData.value.commonData.currentSource]
})
</script>

<style lang="scss" scoped>

</style>
