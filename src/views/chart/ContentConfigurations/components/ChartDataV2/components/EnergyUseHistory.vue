<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="energyUseHistory.enable" />
    </n-space>
  </setting-item-box>
  <setting-item-box name="时间" :alone="true">
    <n-select v-model:value="energyUseHistory.dateType" :options="DateOptions" size="small"/>
  </setting-item-box>
  <setting-item-box name="报表ID" :alone="true">
    <n-space vertical>
      <n-space v-for="(item, i) in computeIds" :key="item.id" align="center" :wrap="false">
        <n-input-number
          :value="item.value"
          @update:value.trim="(v: number) => handleChange(v, i)"
          min="1"
          :show-button="false"
          placeholder="请输入报表ID"
          size="small"
          clearable
        />
        <n-button @click="handleDelete(i)" circle size="tiny">
          <template #icon>
            <n-icon><CloseIcon /></n-icon>
          </template>
        </n-button>
        <n-button v-if="i === computeIds.length - 1" @click="handleAdd" circle size="tiny">
          <template #icon>
            <n-icon><AddIcon /></n-icon>
          </template>
        </n-button>
        <div v-else style="width: 22px"></div> 
      </n-space>
    </n-space>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { watch, reactive, computed } from 'vue'
import type { Ref } from 'vue'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../../hooks/useTargetData.hook'
import { DateOptions } from './ComponentsType.d'
import { icon } from '@/plugins/icon'
import { commonDataType, EnergyUseHistoryType } from '@/store/modules/chartEditStore/chartEditStore.d'

const { CloseIcon, AddIcon } = icon.ionicons5

const { targetData } = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }

const energyUseHistory: Ref<EnergyUseHistoryType> = computed(() => targetData.value.commonData.energyUseHistory)

type computeIdsItemType = {
  id: string,
  value: number | null
}

const computeIds: computeIdsItemType[] = reactive([])

watch(() => [targetData.value.id, energyUseHistory.value], () => {
  if(!energyUseHistory.value.strategy_ids.length) targetData.value.commonData.energyUseHistory.strategy_ids.push(null)
  let arr = energyUseHistory.value.strategy_ids.map((item, i) => {
    return {
      id: `${targetData.value.id}_${i}`,
      value: item
    }
  })
  computeIds.splice(0, computeIds.length, ...arr)
}, {
  deep: true,
  immediate: true
})

const handleChange = (v: number, i: number) => {
  targetData.value.commonData.energyUseHistory.strategy_ids[i] = v
}

const handleAdd = () => {
  targetData.value.commonData.energyUseHistory.strategy_ids.push(null)
}

const handleDelete = (i: number) => {
  targetData.value.commonData.energyUseHistory.strategy_ids.splice(i, 1)
}

</script>

<style lang="scss" scoped>

</style>
