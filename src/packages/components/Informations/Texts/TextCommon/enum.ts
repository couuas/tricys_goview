import { mapToOptions } from '@/utils';

export enum TextCommonEventEnum {
  TEST = 'test'
}

export const eventList = mapToOptions(new Map([
  [TextCommonEventEnum.TEST, '测试内置方法'],
]))

export const TextConfig = {
  key: 'TextCommon',
  title: '文字',
  eventList
} 

