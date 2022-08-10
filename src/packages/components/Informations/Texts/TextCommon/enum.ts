import { OptionsType } from '@/packages/index.d';
import { mapToOptions } from '@/utils';

// 内置方法
export enum TextCommonEventEnum {
  FOO = 'foo',
  BAR = 'bar'
}

//内置事件

export const methodList = mapToOptions(new Map([
  [TextCommonEventEnum.FOO, '内置方法'],
])) as Array<OptionsType>

export const eventList = mapToOptions(new Map([
  [TextCommonEventEnum.BAR, 'setup'],
])) as Array<OptionsType>

export const TextConfig = {
  key: 'TextCommon',
  title: '文字',
  methodList
} 

