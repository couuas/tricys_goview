<template>
  <component
      :is="item.chartConfig.chartKey"
      :chartConfig="item"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
      :style="{...getSizeStyle(item.attr)}"
      v-on="useEvent ? getEventList(item.eventConfig) : {}"
    ></component>
</template>

<script lang='ts' setup>
import { PropType, toRefs, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { useEventBus } from '@/hooks'
import { convertEventBusListeners } from '@/hooks/useEventBus.hook'
import { getSizeStyle } from '../../utils'
import omit from 'lodash/omit'
import { EventTriggerType, EventType } from '@/enums/eventEnum'
import { CreateComponentType, EventConfig } from '@/packages/index.d'
import {  newFunctionHandle } from '@/utils'

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


const { item, themeSetting, themeColor, useEvent } = toRefs(props)
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
  const res = Object.keys(omit(eventConfig, EventType.OTHER)) // 剔除other字段
    .reduce((previousValue: EventConfig, currentValue: string) => {
      // @ts-ignore
      previousValue[currentValue] = eventConfig[currentValue].eventList.map((item: any) => {
        if(item.type === EventTriggerType.JAVASCRIPT){
          return (config: CreateComponentType) => {
            try {
              newFunctionHandle(config, item.code)
            } catch (error) {
              console.error(error, item.code)
              throw error
            }
          }
        }else{
          return () => {
            bus.emit(`${item.componentId}:${item.componentMethod}`)
          }
        }
      })
      return previousValue
    }, {} as EventConfig)
  return res;
}

const listeners = {
  on: {
    forceUpdate: () => {
      instance.ctx.$forceUpdate()
    }
  }
}

useEventBus(convertEventBusListeners(listeners, item.value.id))

</script>

<style lang='less' scoped>
</style>