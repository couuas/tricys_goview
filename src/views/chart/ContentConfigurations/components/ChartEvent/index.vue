<template>
  <n-collapse :default-expanded-names="Object.values(EventType)">
  <!-- todo 暂时用any -->
    <n-collapse-item
      v-for="(item, key) in targetData.eventConfig as any"
      :key="key"
      :title="item.title"
      :name="key">
      <template #header-extra>
        <n-icon size="24" @click.stop="onAddEvent(item, key)">
          <component :is="AddCircleIcon"></component>
        </n-icon>
      </template>
      <n-empty
        v-if="!item.methodList.length"
        :show-icon="false">
      </n-empty>
      <template v-else>
        <n-data-table
          :row-key="(rowData:any) => rowData.uid"
          :columns="columns"
          :data="item.methodList"
        />
      </template>
    </n-collapse-item>
  </n-collapse>

  <n-modal
    v-model:show="showModal"
    title="事件"
    type="info"
    preset="dialog"
    :mask-closable="false"
    :on-after-leave="onModalClosed">
    <n-form
      ref="formRef"
      label-placement="left"
      :rules="rules"
      :model="model"
    >
      <n-form-item label="名称" path="name">
        <n-input v-model:value="model.name" />
      </n-form-item>
      <n-form-item label="类型" path="type">
        <n-select
          v-model:value="model.type"
          placeholder="类型"
          :options="typeOptions"
        />
      </n-form-item>
      <template v-if="model.type === EventTriggerType.COMPONENT">
        <n-form-item label="选择组件" path="componentId">
          <n-select
            v-model:value="model.componentId"
            placeholder="请选择组件"
            :options="componentListOptions"
          />
        </n-form-item>
        <n-form-item label="触发方法" path="componentMethod">
          <n-select
            v-model:value="model.componentMethod"
            placeholder="请选择触发方法"
            :options="componentMethodOptions"
            />
        </n-form-item>
      </template>
      <template v-else-if="model.type === EventTriggerType.JAVASCRIPT">
        <n-form-item label="自定义js" path="code">
          <n-space vertical :style="{width: '100%'}">
            <n-tag type="info">
              <span class="func-keyword">function</span>&nbsp;&nbsp;(data)&nbsp;&nbsp;{
            </n-tag>
            <monaco-editor v-model:modelValue="model.code" language="javascript" height="500px"/>
            <n-tag type="info">}</n-tag>
          </n-space>
        </n-form-item>
      </template>
      <div style="display: flex; justify-content: center">
        <n-space>
          <n-button round type="primary" @click="onSubmit">
            确认
          </n-button>
          <n-button round type="primary" @click="onCancel">
            取消
          </n-button>
        </n-space>
      </div>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import {reactive, ref, h, watch, computed, unref, toRaw, markRaw} from 'vue'
import { icon } from '@/plugins/icon'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { EventType, EventTypeTitle, EventTriggerType, EventTriggerTypeMap, CommonEventMap } from '@/enums/eventEnum'
import { FormInst, NSpace as Space, NIcon as Icon } from 'naive-ui'
import { getUUID, mapToOptions } from '@/utils'
import { useTargetData } from '../hooks/useTargetData.hook'
import { CreateComponentType, OptionsType, EventConfig, EventConfigValue } from '@/packages/index.d'

const { targetData, chartEditStore } = useTargetData();

// 事件配置
const eventConfig = computed<EventConfig>(() => {
  return targetData.value?.eventConfig
})

// 监听数据变化, 设置初始值
watch(targetData, (newVal) => {
  if(!newVal)return
  if(!eventConfig.value){
    newVal.eventConfig = reactive({})
  }
  //原生事件
  Object.keys(EventTypeTitle).forEach((key: string) => {
    if(!(key in eventConfig.value)){
      (newVal.eventConfig as any)[key] = {
        title: EventTypeTitle[key as EventType],
        methodList: []
      }
    }
  })
  // 组件内置事件
  newVal.chartConfig.eventList?.map((item: OptionsType) => {
    if(!(item.value in eventConfig.value)){
      (newVal.eventConfig as any)[item.value] = {
        title: item.label,
        methodList: []
      }
    }
  })
  }, {
    immediate: true
  })

const { AddCircleIcon } = icon.ionicons5

const showModal = ref(false)

let eventType: EventType = EventType.CLICK
let operateCollapse: any = null

const formRef = ref<FormInst | null>(null)

const model = ref<Record<string, string>>({
  uid: '',
  name: '',
  type: EventTriggerType.JAVASCRIPT,
  code: '',
  componentId: ''
});

const defaultModel: Record<string, string> = {
  ...markRaw(toRaw(unref(model)))
}

const typeOptions = [
  {label: EventTriggerTypeMap.get(EventTriggerType.COMPONENT), value: EventTriggerType.COMPONENT},
  {label: EventTriggerTypeMap.get(EventTriggerType.JAVASCRIPT), value: EventTriggerType.JAVASCRIPT},
]

const componentListOptions = computed(() => {
  return chartEditStore.componentList.map(item => {
    return {
      disabled: item.id === targetData.value.id,
      label: item.chartConfig.title,
      value: item.id
    }
  })
})

const selectedComponent = computed((): CreateComponentType | void => {
  return chartEditStore.componentList.find(item => Object.is(item.id, model.value.componentId))
})

const commMethodList = mapToOptions(CommonEventMap)

const componentMethodOptions = computed(() => {
  return [
    ...commMethodList,
    ...(selectedComponent.value ? (selectedComponent.value.chartConfig.methodList as Array<OptionsType>) : [])
  ]
})

const rules = {
  name: { required: true, message: '必填项不能为空' },
  type: { required: true, message: '必填项不能为空' },
  componentId: { required: true, message: '必填项不能为空' },
  componentMethod: { required: true, message: '必填项不能为空' },
}

const onAddEvent = (item: any, type: EventType) => {
  eventType = type
  operateCollapse = item
  showModal.value = true
}

const onEdit = (rowData: Record<string, any>) => {
  model.value = {
    ...rowData
  }
  eventType = rowData.eventType
  // @ts-ignore
  operateCollapse = targetData.value?.eventConfig[eventType]
  showModal.value = true
}

const columnIconAttr = {
  size: 18,
  style: {
    cursor: 'pointer'
  }
}

const columns = [
  { title: '名称', key: 'name'},
  { title: '类型', key: 'type', render(rowData: any){
    return EventTriggerTypeMap.get(rowData.type)
  }},
  { title: '操作', render(rowData: any, rowIndex: number){
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
              ((eventConfig.value[rowData.eventType as keyof EventConfig]) as EventConfigValue[string]).methodList.splice(rowIndex, 1)
            }
          }, () => h(icon.ionicons5.RemoveIcon))
        ]
      }
    })))
  }},
]


const onSubmit = () => {
    formRef.value?.validate((errors) => {
      if (!errors && operateCollapse) {
        if(model.value.uid){
          const index = operateCollapse.methodList
                          .findIndex((item:any) => item.uid === model.value.uid)
          if(index > -1){
            operateCollapse.methodList[index] = {...model.value}
          }
        }else{
          operateCollapse.methodList.push({
            ...model.value,
            eventType,
            uid: getUUID(),
          })
        }
        showModal.value = false
      }
    })
}

const onCancel = () => {
  showModal.value = false
}

const onModalClosed = () => {
  Object.keys(model.value).forEach(key => {
    if(key in defaultModel){
      model.value[key] = defaultModel[key]
    }else{
      model.value[key] = ''
    }
  })
}

</script>

<style lang="scss" scoped>
.func-keyword {
  color: #b478cf;
}
</style>