<template>
  <CollapseItem name="关联表单组件" :expanded="true">
    <template #header>
      <n-icon size="24" @click="onAdd">
        <component :is="AddCircleIcon"></component>
      </n-icon>
    </template>
    <n-data-table
      :columns="columns"
      :data="data"
    />
  </CollapseItem>
</template>

<script setup lang="ts">
import {
  CollapseItem
} from '@/components/Pages/ChartItemSetting'
import { icon } from '@/plugins/icon'
import { FormInst, NSpace as Space, NIcon as Icon } from 'naive-ui'
import { ref, watch, h, reactive } from 'vue'
import { useTargetData } from '../../../hooks/useTargetData.hook'

const { targetData } = useTargetData();
const { AddCircleIcon } = icon.ionicons5
const showModal = ref(false)
const model = ref({})

let dataCollectComponentList: any

watch(targetData, () => {
  if(targetData.value.dataCollectComponentList){
    dataCollectComponentList = targetData.value.dataCollectComponentList
  }else{
    dataCollectComponentList = reactive([])
  }
})

const columnIconAttr = {
  size: 18,
  style: {
    cursor: 'pointer'
  }
}

const onAdd = () => {
  model.value = {}
  showModal.value = true
}

const onEdit = (rowData: Record<string, any>) => {
  model.value = {
    ...rowData
  }
  showModal.value = true
}

const columns = [
  {title: '组件名称', key: 'componentName'},
  // {title: '组件Id', key: 'componentId'},
  {title: '绑定字段', field: 'field'},
  { title: '操作', render(rowData: any){
    return h(Space, () => (h({
      render(){
        return [
          h(Icon, {
            ...columnIconAttr,
            title: '编辑',
            onClick(){
              onEdit(rowData)
            }
          }, () => h(icon.carbon.EditIcon)),
          h(Icon, {
            ...columnIconAttr,
            title: '删除',
            onClick(){
              
            }
          }, () => h(icon.ionicons5.RemoveIcon))
        ]
      }
    })))
  }},
]
const data: Array<any> = []

</script>

<style></style>
