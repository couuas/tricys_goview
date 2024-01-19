<template>
  <setting-item-box name="测点历史记录" :alone="true">
  </setting-item-box>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="energyUseHistory.enable" />
    </n-space>
  </setting-item-box>
  <setting-item-box name="时间" :alone="true">
    <n-select v-model:value="energyUseHistory.dateType" :options="DateOptions" size="small"/>
  </setting-item-box>
  <setting-item-box name="测点ID" :alone="true">
    <n-space vertical>
      <n-space v-for="(item, i) in computeIds" :key="item.id" align="center" :wrap="false">
        <n-input
          :value="item.value"
          @update:value="(v: string) => handleChange(v, i)"
          placeholder="请输入测点ID"
          size="small"
          clearable
        />
        <n-button @click="handleDelete(i)" circle size="tiny">
          <template #icon>
            <n-icon><CloseIcon /></n-icon>
          </template>
        </n-button>
      </n-space>
      <n-space align="center" :wrap="false">
        <n-input v-model:value="templateValue" placeholder="请输入测点ID" size="small" clearable/>
        <n-button @click="handleAdd" circle size="tiny">
          <template #icon>
            <n-icon><AddIcon /></n-icon>
          </template>
        </n-button>
      </n-space>
    </n-space>
  </setting-item-box>
  <setting-item-box name="更新间隔" :alone="true">
    <n-input-group>
      <n-input-number
        v-model:value.trim="targetData.request.requestInterval"
        min="1"
        :show-button="false"
        placeholder="请输入"
        size="small"
        style="flex: 1;"
      >
      </n-input-number>
      <!-- 单位 -->
      <n-select class="select-time-options" v-model:value="targetData.request.requestIntervalUnit" :options="selectTimeOptions" size="small" style="width: 80px"/>
    </n-input-group>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, toRefs, computed } from 'vue'
import type { Ref } from 'vue'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../../hooks/useTargetData.hook'
import { DateOptions } from './EnergyUseHistory.d'
import { nanoid } from 'nanoid'
import { icon } from '@/plugins/icon'
import { commonDataType, RequestConfigType, EnergyUseHistoryType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { selectTimeOptions } from '../index.d'

const { CloseIcon, AddIcon } = icon.ionicons5

const { targetData } = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string, request: RequestConfigType }> }

// const commonData: Ref<commonDataType> = computed(() => targetData.value.commonData)
const energyUseHistory: Ref<EnergyUseHistoryType> = computed(() => targetData.value.commonData.energyUseHistory)

type computeIdsItemType = {
  id: string,
  value: string
}

const computeIds: computeIdsItemType[] = reactive([])

let templateValue = ref('')

watch(() => [targetData.value?.id, energyUseHistory.value], () => {
  templateValue.value = ''
  let arr = energyUseHistory.value.strategy_ids.map(item => {
    return {
      id: nanoid(),
      value: item
    }
  })
  computeIds.splice(0, computeIds.length, ...arr)
}, {
  deep: true,
  immediate: true
})

const handleChange = (v: string, i: number) => {
  targetData.value.commonData.energyUseHistory.strategy_ids[i] = v
}

const handleAdd = () => {
  if(templateValue.value) {
    targetData.value.commonData.energyUseHistory.strategy_ids.push(templateValue.value)
    templateValue.value = ''
  }
}

const handleDelete = (i: number) => {
  targetData.value.commonData.energyUseHistory.strategy_ids.splice(i, 1)
}

</script>

<style lang="scss" scoped>

</style>
