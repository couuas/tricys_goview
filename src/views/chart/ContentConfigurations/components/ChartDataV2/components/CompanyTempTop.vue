<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="currentObj.enable"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="测点编码" :alone="true">
    <n-input v-model:value="currentObj.signal_ids" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="空间ID" :alone="true">
    <n-input v-model:value="currentObj.space_complete_id" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="显示完整空间层级" :alone="true">
    <n-input-number v-model:value="currentObj.spaceLevel" size="small" :min='1'/>

  </setting-item-box>
 
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import type {Ref} from 'vue'
import {SettingItemBox} from '@/components/Pages/ChartItemSetting'
import {useTargetData} from '../../hooks/useTargetData.hook'
import {commonDataType, CompanyTempTopType} from '@/store/modules/chartEditStore/chartEditStore.d'
const {targetData} = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }

const currentObj = computed(() => {
  return targetData.value.commonData[targetData.value.commonData.currentSource] as CompanyTempTopType
})

</script>

<style lang="scss" scoped>

</style>
