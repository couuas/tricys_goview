<template>
  <setting-item-box name="设备UID" :alone="true">
    <n-space vertical>
      <n-space v-for="(item, i) in computeIds" :key="i" align="center" :wrap="false">
        <n-input
          :value="item.value"
          @update:value="(v: string) => handleChange(v, i)"
          placeholder="请输入设备UID"
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
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { reactive, watch, toRefs, ToRefs } from 'vue';
import {customData as cd} from './config'
import {icon} from "@/plugins";

const props = defineProps(['customData', 'request'])
const { CloseIcon, AddIcon } = icon.ionicons5

type computeIdsItemType = {
  id: string,
  value: string
}

const computeIds: computeIdsItemType[] = reactive([])

const {customData} = toRefs(props) as ToRefs<{customData: typeof cd}>

watch(() => customData.value.ids, () => {
  if(!customData.value.ids.length) customData.value.ids.push('')
  let arr = customData.value.ids.map((item: string, i: number) => {
    return {
      id: `a_${i}`,
      value: item
    }
  })
  computeIds.splice(0, computeIds.length, ...arr)
}, {
  deep: true,
  immediate: true
})

const handleChange = (v: string, i: number) => {
  customData.value.ids[i] = v
}

const handleAdd = () => {
  customData.value.ids.push('')
}

const handleDelete = (i: number) => {
  customData.value.ids.splice(i, 1)
}
</script>

<style lang="scss" scoped>
</style>
