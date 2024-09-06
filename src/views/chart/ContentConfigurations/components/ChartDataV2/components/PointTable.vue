<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="pointTable.enable" />
    </n-space>
  </setting-item-box>
  <setting-item-box name="测点编码" :alone="true">
    <n-space vertical>
      <n-space v-for="(item, i) in computeIds" :key="item.id" align="center" :wrap="false">
        <n-input
          :value="item.value"
          @update:value="(v: string) => handleChange(v, i)"
          placeholder="请输入测点编码"
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
import { icon } from '@/plugins/icon'
import { commonDataType, PointTableType } from '@/store/modules/chartEditStore/chartEditStore.d'

const { CloseIcon, AddIcon } = icon.ionicons5

const { targetData } = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }

const pointTable: Ref<PointTableType> = computed(() => targetData.value.commonData.pointTable)

type computeIdsItemType = {
  id: string,
  value: string
}

const computeIds: computeIdsItemType[] = reactive([])

watch(() => [targetData.value.id, pointTable.value], () => {
  if(!pointTable.value.ids.length) targetData.value.commonData.pointTable.ids.push('')
  let arr = pointTable.value.ids.map((item, i) => {
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

const handleChange = (v: string, i: number) => {
  targetData.value.commonData.pointTable.ids[i] = v
}

const handleAdd = () => {
  targetData.value.commonData.pointTable.ids.push('')
}

const handleDelete = (i: number) => {
  targetData.value.commonData.pointTable.ids.splice(i, 1)
}

</script>

<style lang="scss" scoped>

</style>
