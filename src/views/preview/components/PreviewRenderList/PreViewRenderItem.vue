<template>
  <component
      ref="componentRef"
      :is="item.chartConfig.chartKey"
      :chartConfig="item"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
      :style="{...getSizeStyle(item.attr)}"
      v-on="useEvent ? getEventList(item.eventConfig as EventConfig) : {}"
    ></component>
</template>

<script lang='ts' setup>
import { PropType, toRefs, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { useEventBus } from '@/hooks'
import { convertEventBusListeners } from '@/hooks/useEventBus.hook'
import { getSizeStyle } from '../../utils'
import { EventTriggerType } from '@/enums/eventEnum'
import { CreateComponentType, EventConfig, PackagesCategoryEnum } from '@/packages/index.d'
import {  newFunctionHandle } from '@/utils'
import isObject from 'lodash/isObject'
import { COMMON_EVENT_ENUM, DATA_COMPONENT_EVENT_ENUM } from '@/enums/eventEnum'

const props = defineProps({
  item: {
    type: Object as PropType<CreateComponentType>,
    required: true
  },
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  useEvent: {
    type: Boolean,
    default: false
  }
})


const { item, themeSetting, themeColor, useEvent } = toRefs(props);
const componentRef = ref(null)
const instance = getCurrentInstance() as ComponentInternalInstance
const bus = useEventBus()
/**
 * @return
 * {
 *  click: [fn1, fn2],
 *  change: [fn1, fn2],
 * }
 */
const getEventList = (eventConfig: EventConfig) => {
  if(!isObject(eventConfig)) return {}
  const res = Object.keys(eventConfig)
    .reduce((previousValue: EventConfig, currentValue: string) => {
      // @ts-ignore
      previousValue[currentValue] = eventConfig[currentValue].methodList.map((item: any) => {
        if(item.type === EventTriggerType.JAVASCRIPT){
          return (e: any) => {
            try {
              newFunctionHandle(e, item.code)
            } catch (error) {
              console.error(error, item.code)
              throw error
            }
          }
        }else{
          return (data: any) => {
            bus.emit(`${item.componentId}:${item.componentMethod}`, data)
          }
        }
      })
      return previousValue
    }, {} as EventConfig)
  return res;
}
// 是否是数据组件
const isDataComponent = computed(() => {
  return item.value.chartConfig.package === PackagesCategoryEnum.CHARTS ||
          item.value.chartConfig.package === PackagesCategoryEnum.TABLES
})

const listeners: Record<string, any> = {
  on: {
    [COMMON_EVENT_ENUM.FORCE_UPDATE]: () => {
      instance.proxy?.$forceUpdate()
    }
  }
}

if(isDataComponent.value){
  // 数据组件监听刷新数据
  listeners.on[DATA_COMPONENT_EVENT_ENUM.LOAD_DATA] = () => {
    componentRef.value.loadData()
  }
}

useEventBus(convertEventBusListeners(listeners, item.value.id))

</script>

<style lang='less' scoped>
</style>