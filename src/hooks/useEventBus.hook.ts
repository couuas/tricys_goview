import Emitter from 'tiny-emitter'
import { onBeforeUnmount } from 'vue'


/**
 * {
 *  on: {
 *    [event]: []
 *  },
 * }
 */

type EventBusListeners = {
  [key: string]: () => any
};

export type EventBusOptions = {
  on?: EventBusListeners
  once?: EventBusListeners
}


//@ts-ignore
const bus = new Emitter()

const addListeners = (listeners: EventBusListeners | undefined, isOnce = false): void => {
  if(!listeners)  return
  Object.keys(listeners).forEach(key => {
    console.info('监听事件:', key)
    bus[isOnce ? 'once' : 'on'](key, listeners[key])
    onBeforeUnmount(() => {
      bus.off(key, listeners[key])
    })
  })
}


// 转换事件名
const convertListeners = (listeners: EventBusListeners, dst: object, prefix = 'prefix'): void => {
  Object.keys(listeners).forEach((key: string) => {
    // @ts-ignore
    dst[`${prefix}:${key}`] = listeners[key]
  })
}

export const convertEventBusListeners = (listeners: EventBusOptions, prefix: string): EventBusOptions => {
  const res = {
    on: {},
    once: {},
  }

  if(listeners.on) {
    convertListeners(listeners.on, res.on, prefix)
  }

  if(listeners.once) {
    convertListeners(listeners.once, res.once, prefix)
  }

  return res
}

export const useEventBus = (listeners: EventBusOptions = {}) => {
  addListeners(listeners.on);
  addListeners(listeners.once, true)
  return bus
}
