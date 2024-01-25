<template>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="pointRealTime.enable" />
    </n-space>
  </setting-item-box>
  <setting-item-box name="标签带空间名" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="pointRealTime.space_complete_name_prefix" />
    </n-space>
  </setting-item-box>
  <setting-item-box name="标签带设备名" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="pointRealTime.with_device_name" />
    </n-space>
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
        <n-button v-if="i === computeIds.length - 1" @click="handleAdd" circle size="tiny">
          <template #icon>
            <n-icon><AddIcon /></n-icon>
          </template>
        </n-button>
        <div v-else style="width: 22px"></div>
      </n-space>
    </n-space>
  </setting-item-box>
  <setting-item-box name="类目数量" :alone="true">
    <n-input-number
      v-model:value="pointRealTime.limit"
      min="1"
      placeholder="请输入测点数量"
      size="small"
      clearable
    />
  </setting-item-box>
</template>

<script lang="ts" setup>
import { watch, reactive, computed } from 'vue'
import type { Ref } from 'vue'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../../hooks/useTargetData.hook'
import { icon } from '@/plugins/icon'
import { commonDataType, PointRealTimeType } from '@/store/modules/chartEditStore/chartEditStore.d'

const { CloseIcon, AddIcon } = icon.ionicons5

const { targetData } = useTargetData() as { targetData: Ref<{ commonData: commonDataType, id: string }> }

const pointRealTime: Ref<PointRealTimeType> = computed(() => targetData.value.commonData.pointRealTime)

type computeIdsItemType = {
  id: string,
  value: string
}

const computeIds: computeIdsItemType[] = reactive([])


watch(() => [targetData.value.id, pointRealTime.value.point_uid], () => {
  if(!pointRealTime.value.point_uid.length) pointRealTime.value.point_uid.push('')
  let arr = pointRealTime.value.point_uid.map((item, i) => {
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
  targetData.value.commonData.pointRealTime.point_uid[i] = v
}

const handleAdd = () => {
  targetData.value.commonData.pointRealTime.point_uid.push('')
}

const handleDelete = (i: number) => {
  targetData.value.commonData.pointRealTime.point_uid.splice(i, 1)
}

</script>

<style lang="scss" scoped>

</style>