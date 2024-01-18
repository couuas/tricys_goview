<template>
  <setting-item-box name="测点历史记录" :alone="true">
  </setting-item-box>
  <setting-item-box name="启用数据" :alone="true">
    <n-space justify="start">
      <n-switch v-model:value="targetData.commonData.enable" />
    </n-space>
  </setting-item-box>
  <setting-item-box name="时间" :alone="true">
    <n-select v-model:value="targetData.commonData.dateType" :options="DateOptions" size="small"/>
  </setting-item-box>
  <setting-item-box name="统计方式" :alone="true">
    <n-select multiple v-model:value="targetData.commonData.methods" :options="MethodsOptions" size="small" />
  </setting-item-box>
  <setting-item-box name="测点ID" :alone="true">
    <n-space vertical>
      <n-space v-for="(item, i) in computeIds" :key="item.id" align="center" :wrap="false">
        <n-input
          :value="item.value"
          @update:value="v => handleChange(v, i)"
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
      <n-input v-model:value="templateValue" @blur="handleBlur" @keydown.enter="handleBlur" placeholder="请输入测点ID" size="small" clearable/>
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
import { ref, watch, reactive, toRefs } from 'vue'
import type { Ref } from 'vue'
import moment from 'moment'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../../hooks/useTargetData.hook'
import { DateOptions, MethodsOptions } from './ChartDataPointHistory.d'
import { nanoid } from 'nanoid'
import { icon } from '@/plugins/icon'
import { commonDataType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { selectTimeOptions } from '../index.d'

const { CloseIcon } = icon.ionicons5

const { targetData } = useTargetData()

const templateValue = ref('')

type computeIdsItemType = {
  id: string,
  value: string
}

const { commonData } = toRefs(targetData.value) as { commonData: Ref<commonDataType> }

let computeIds: computeIdsItemType[] = reactive(commonData.value.dems_device_points_uid.map((_: string) => {
  return {
    id: nanoid(),
    value: _
  }
}))

// 用targetData.value.commonData.dems_device_points_uid 不用commonData.value.dems_device_points_uid
// commonData.value.dems_device_points_uid好像丢失了响应性 晚点在研究
watch(() => targetData.value.id, () => {
  if(!targetData.value.commonData) return
  let arr = targetData.value.commonData.dems_device_points_uid.map((_: string) => {
    return {
      id: nanoid(),
      value: _
    }
  })
  computeIds.splice(0, computeIds.length, ...arr)
})

watch(() => commonData.value.dems_device_points_uid, (v) => {
  const length = commonData.value.dems_device_points_uid.length
  if(length > computeIds.length) {
    computeIds.push({
      id: nanoid(),
      value: v[length - 1]
    })
  }
  else if(length < computeIds.length) {
    for(let i = 0; i < computeIds.length; i++) {
      if(i === computeIds.length - 1) {
        computeIds.splice(-1)
        break
      }
      else if(computeIds[i].value !== commonData.value.dems_device_points_uid[i]){
        computeIds.splice(i, 1)
        break
      }
    }
  }
  else {
    computeIds.forEach((item, i) => {
      item.value = commonData.value.dems_device_points_uid[i]
    })
  }
}, {
  deep: true
})

const handleBlur = () => {
  if(targetData.value && commonData.value && templateValue.value) {
    commonData.value.dems_device_points_uid.push(templateValue.value)
    templateValue.value = ''
  }
}

const handleChange = (v: string, i: number) => {
  if(targetData.value && commonData.value) {
    commonData.value.dems_device_points_uid[i] = v
  }
}

const handleDelete = (i: number) => {
  commonData.value.dems_device_points_uid.splice(i, 1)
}

</script>

<style lang="scss" scoped>

</style>
