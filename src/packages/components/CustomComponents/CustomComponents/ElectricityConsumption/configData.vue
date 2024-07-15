<template>
  <setting-item-box name="标题1" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="标题2" :alone="true">
    <n-input v-model:value="props.customData.title1" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="标题3" :alone="true">
    <n-input v-model:value="props.customData.title2" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="启用数据">
    <n-space>
      <n-switch v-model:value="props.customData.enable" size="small"/>
    </n-space>
  </setting-item-box>
  <setting-item-box name="开启演示模式">
    <n-space>
      <n-switch v-model:value="props.customData.demonstration" size="small"/>
    </n-space>
  </setting-item-box>
  <setting-item-box v-for="(it, i) in props.customData.arr" :key="i" :name="`柱状图-${i + 1}`">
    <setting-item name="名字">
      <n-input v-model:value="it.name" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="报表ID">
      <n-input-number v-model:value="it.id" size="small" placeholder="请输入"/>
    </setting-item>
  </setting-item-box>
  <setting-item-box name="增加楼栋" :alone="true">
    <n-space vertical>
      <div v-for="(item, i) in computeArr" :key="i" style="margin-top: 2px;display: flex">
        <n-text style="flex: 1;margin-right: 10px;">{{ item }}</n-text>
        <n-button v-if="computeArr.length !== 1" style="flex: none;margin-right: 10px;" @click="handleDelete(i)" circle size="tiny">
          <template #icon>
            <n-icon>
              <CloseIcon/>
            </n-icon>
          </template>
        </n-button>
        <n-button v-if="i === computeArr.length - 1" @click="handleAdd" circle size="tiny">
          <template #icon>
            <n-icon>
              <AddIcon/>
            </n-icon>
          </template>
        </n-button>
        <div v-else style="width: 22px"></div>
      </div>
    </n-space>
  </setting-item-box>
</template>

<script lang="ts" setup>
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import {computed} from "vue";
import {cloneDeep} from "lodash";
import {icon} from "@/plugins";

const { CloseIcon, AddIcon } = icon.ionicons5

const props = defineProps(['customData', 'request'])

const computeArr = computed(() => {
  return props.customData.arr.map((item: any, index: number) => {
    return `柱状图-${index + 1}`
  })
})

const handleDelete = (i: number) => {
  props.customData.arr.splice(i, 1)
}

const handleAdd = () => {
  let obj = { name: '', id: null }
  props.customData.arr.push(cloneDeep(obj))
}
</script>

<style lang="scss" scoped>
</style>
