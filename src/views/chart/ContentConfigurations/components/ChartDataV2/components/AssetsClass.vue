<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="currentObj.enable"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="数据源" :alone="true">
        <n-select v-model:value="currentObj.dataSource" :options="multipleSourceOptions" size="small"/>
      </setting-item-box>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import type {Ref} from 'vue'
import {SettingItemBox} from '@/components/Pages/ChartItemSetting'
import {useTargetData} from '../../hooks/useTargetData.hook'
import {commonDataType, AssetsClassType} from '@/store/modules/chartEditStore/chartEditStore.d'
const {targetData} = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }

const currentObj = computed(() => {
  return targetData.value.commonData[targetData.value.commonData.currentSource] as AssetsClassType
})
console.log(targetData,'targetData')
const multipleSourceOptions = [
  {
    label: '配电设备',
    value:'device'
  },
  {
    label: 'IT设备',
    value:'IT'
  },

]
</script>

<style lang="scss" scoped>

</style>
