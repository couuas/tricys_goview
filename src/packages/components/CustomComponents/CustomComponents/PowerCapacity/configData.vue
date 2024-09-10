<template>
  <setting-item-box name="标题" :alone="true">
    <n-input v-model:value="props.customData.title" size="small" placeholder="请输入"/>
  </setting-item-box>
  <setting-item-box name="启用数据">
    <n-space>
      <n-switch v-model:value="props.customData.enable" size="small"/>
    </n-space>
  </setting-item-box>
  <setting-item-box :name="`第${i + 1}部分`" v-for="(it, i) in props.customData.arr" :key="i">
    <setting-item name="启用">
      <n-space>
        <n-switch v-model:value="it.show" size="small"/>
      </n-space>
    </setting-item>
    <setting-item name="名称">
      <n-input v-model:value="it.name" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="设计容量名称">
      <n-input v-model:value="it.label" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="设计容量值">
      <n-input-number v-model:value="it.value" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="总功率名称">
      <n-input v-model:value="it.label1" size="small" placeholder="请输入"/>
    </setting-item>
    <setting-item name="总功率测点计算公式">
      <n-input v-model:value="it.calculation" size="small" placeholder="请输入"/>
    </setting-item>
    <!--    <setting-item name=""/>-->
    <template v-for="(it, i) in it.floor" :key="i">
      <setting-item :name="`楼层名字-${i + 1}`">
        <n-input v-model:value="it.label" size="small" placeholder="请输入"/>
      </setting-item>
      <setting-item :name="`测点计算公式-${i + 1}`">
        <n-input v-model:value="it.calculation" size="small" placeholder="请输入"/>
      </setting-item>
    </template>
  </setting-item-box>
  <setting-item-box name="增加楼栋" :alone="true">
    <n-space vertical>
      <div v-for="(item, i) in computeArr" :key="i" style="margin-top: 2px;">
        <div style="display: flex;">
          <n-text style="flex: 1;margin-right: 10px;">{{ item.label }}</n-text>
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
        <div style="display: flex;margin-top: 5px;" v-for="(cIt, ci) in item.children" :key="`${i}-${ci}`">
          <n-text style="flex: 1;margin-right: 10px;">&nbsp;&nbsp;{{ cIt }}</n-text>
          <n-button v-if="item.children.length !== 1" style="flex: none;margin-right: 10px;" @click="handleDeleteFloor(i, ci)" circle size="tiny">
            <template #icon>
              <n-icon>
                <CloseIcon/>
              </n-icon>
            </template>
          </n-button>
          <n-button v-if="ci === item.children.length - 1" @click="handleAddFloor(i)" circle size="tiny">
            <template #icon>
              <n-icon>
                <AddIcon/>
              </n-icon>
            </template>
          </n-button>
          <div v-else style="width: 22px"></div>
        </div>
      </div>
    </n-space>
  </setting-item-box>
</template>

<script lang="ts" setup>
import {SettingItemBox, SettingItem} from '@/components/Pages/ChartItemSetting'
import {computed} from 'vue'
import {cloneDeep} from 'lodash'
import {icon} from "@/plugins";
const { CloseIcon, AddIcon } = icon.ionicons5

const props = defineProps(['customData', 'request'])

const computeArr = computed(() => {
  return props.customData.arr.map((item: any, index: number) => {
    return {
      label: `第${index + 1}部分`,
      children: item.floor.map((_: any, i: number) => `楼层名字-${i + 1}`)
    }
  })
})

const handleDelete = (i: number) => {
  props.customData.arr.splice(i, 1)
}

const handleAdd = () => {
  let obj = {
    name: '', show: true, label: '设计容量', value: 20000, label1: '已使用', calculation: '', floor: [
      {label: '1F', calculation: ''},
      {label: '2F', calculation: ''},
      {label: '3F', calculation: ''},
      {label: '4F', calculation: ''},
    ]
  }
  props.customData.arr.push(cloneDeep(obj))
}

const handleDeleteFloor = (i: number, ci: number) => {
  props.customData.arr[i].floor.splice(ci, 1)
}

const handleAddFloor = (i: number) => {
  let obj = {label: '', calculation: ''}
  props.customData.arr[i].floor.push(cloneDeep(obj))
}



</script>

<style lang="scss" scoped>
</style>
