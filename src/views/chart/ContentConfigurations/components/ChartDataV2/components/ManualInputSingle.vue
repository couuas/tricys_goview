<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="manualInputSingle.enable"/>
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
import { commonDataType, ManualInputSingleType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import singleDataJson from '@/hooks/commonDataComponents/singleData.json'

const { targetData } = useTargetData() as { targetData: Ref<{ commonData: commonDataType }> }
const manualInputSingle: Ref<ManualInputSingleType> = computed(() => targetData.value.commonData.manualInputSingle)

const dataset = ref(JSON.stringify(singleDataJson))

const setDataset = (v: string) => {
  let obj = {...singleDataJson}
  try {
    let d = JSON.parse(v)
    if(Object.prototype.toString.call(d) === '[object Object]') {
      obj = d
    }
  } catch (e) {
    console.log(e)
  }
  manualInputSingle.value.result = obj
  // dataset.value = JSON.stringify(obj)
}

watch(() => dataset.value, () => {
  let obj = {...singleDataJson}
  setDataset(manualInputSingle.value.enable ? dataset.value : JSON.stringify(obj))
})

watch(() => manualInputSingle.value.enable, v => {
  let obj = {...singleDataJson}
  setDataset(v ? dataset.value : JSON.stringify(obj))
})

</script>

<style lang="scss" scoped>

</style>