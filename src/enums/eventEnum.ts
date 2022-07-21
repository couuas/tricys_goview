export enum EventType {
  CLICK = 'click',
  DBCLICK = 'dblclick',
  CHANGE = 'change',
  // MOUSE_ENTER = 'mouseenter',
  // MOUSE_LEAVE = 'mouseleave',
  MOUNTED = 'vnodeMounted',
  // OTHER = 'other'
}

export const EventTypeTitle = {
  [EventType.CLICK]: '点击',
  [EventType.DBCLICK]: '双击',
  [EventType.CHANGE]: '值变化',
  // [EventType.MOUSE_ENTER]: '鼠标进入',
  // [EventType.MOUSE_LEAVE]: '鼠标移开',
  [EventType.MOUNTED]: '渲染完成',
  // [EventType.OTHER]: '其它',
}

export enum EventTriggerType {
  COMPONENT = 'component',
  JAVASCRIPT = 'javascript'
}

export const EventTriggerTypeMap =  new Map(
  [
    [EventTriggerType.COMPONENT, '组件联动'],
    [EventTriggerType.JAVASCRIPT, '自定义js'],
  ]
)

export const CommonEventMap = new Map(
  [
    ['forceUpdate', '强制更新'],
  ]
)

