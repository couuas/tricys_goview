<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="manualInput.enable"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="数据" :alone="true">
    <n-input
      v-model:value="dataset"
      placeholder="请输入"
      size="small"
      clearable
    />
  </setting-item-box>
</template>

<script setup lang="ts">
import { useTargetData } from "../../hooks/useTargetData.hook";
import { computed, ref, watch } from 'vue'
import type { Ref } from "vue";
import { commonDataType, ManualInputType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import dataJson from '@/hooks/commonDataComponents/data.json'

const { targetData } = useTargetData() as { targetData: Ref<{ commonData: commonDataType }> }
const manualInput: Ref<ManualInputType> = computed(() => targetData.value.commonData.manualInput)

const dataset = ref(JSON.stringify(dataJson))

const setDataset = (v: string) => {
  let obj = {...dataJson}
  try {
    let d = JSON.parse(v)
    if(Object.prototype.toString.call(d.dimensions) === '[object Array]' && Object.prototype.toString.call(d.source)) {
      obj = d
    }
  } catch (e) {
    console.log(e)
  }
  manualInput.value.dataset = obj
  // dataset.value = JSON.stringify(obj)
}

watch(() => dataset.value, () => {
  let obj = {...dataJson}
  setDataset(manualInput.value.enable ? dataset.value : JSON.stringify(obj))
})

watch(() => manualInput.value.enable, v => {
  let obj = {...dataJson}
  setDataset(v ? dataset.value : JSON.stringify(obj))
})
</script>

<style lang="scss" scoped>

</style>