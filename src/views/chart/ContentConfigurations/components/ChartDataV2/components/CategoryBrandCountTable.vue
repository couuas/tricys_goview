<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="categoryBrandCountTable.enable" />
    </n-space>
    
  </setting-item-box>
  <setting-item-box name="数据源" :alone="true">
        <n-select v-model:value="categoryBrandCountTable.currentSource" :options="multipleSourceOptions" size="small"/>
      </setting-item-box>

</template>

<script lang="ts" setup>
import { watch, reactive, computed } from 'vue'
import type { Ref } from 'vue'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../../hooks/useTargetData.hook'
import { icon } from '@/plugins/icon'
import { commonDataType, CategoryBrandCountTableType } from '@/store/modules/chartEditStore/chartEditStore.d'

const { CloseIcon, AddIcon } = icon.ionicons5

const { targetData } = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }

const categoryBrandCountTable: Ref<CategoryBrandCountTableType> = computed(() => targetData.value.commonData.categoryBrandCountTable)
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
// type computeIdsItemType = {
//   id: string,
//   value: string
// }

// const computeIds: computeIdsItemType[] = reactive([])

// watch(() => [targetData.value.id, pointTable.value], () => {
//   if(!pointTable.value.ids.length) targetData.value.commonData.pointTable.ids.push('')
//   let arr = pointTable.value.ids.map((item, i) => {
//     return {
//       id: `${targetData.value.id}_${i}`,
//       value: item
//     }
//   })
//   computeIds.splice(0, computeIds.length, ...arr)
// }, {
//   deep: true,
//   immediate: true
// })

// const handleChange = (v: string, i: number) => {
//   targetData.value.commonData.pointTable.ids[i] = v
// }

// const handleAdd = () => {
//   targetData.value.commonData.pointTable.ids.push('')
// }

// const handleDelete = (i: number) => {
//   targetData.value.commonData.pointTable.ids.splice(i, 1)
// }

</script>

<style lang="scss" scoped>

</style>
