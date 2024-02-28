<template>
  <n-space vertical>
    <setting-item-box name="组态ID" :alone="true">
      <n-input-number v-model:value="mapId" size="small" placeholder="请输入组态ID"/>
    </setting-item-box>
  </n-space>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { debounce } from 'lodash'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])

let mapId: Ref<null | number> = ref(null)
mapId.value = props.customData.mapId as (null | number)
const setMapId = debounce((v: null | number) => {
  props.customData.mapId = v
}, 500)

watch(() => {
  return mapId.value
}, (v: null | number) => {
  setMapId(v)
})
</script>

<style lang="scss" scoped>
</style>
