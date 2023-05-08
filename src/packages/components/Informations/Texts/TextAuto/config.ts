import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TextAutoConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export enum WritingModeEnum {
  HORIZONTAL = '水平',
  VERTICAL = '垂直',
}

export const WritingModeObject = {
  [WritingModeEnum.HORIZONTAL]: 'horizontal-tb',
  [WritingModeEnum.VERTICAL]: 'vertical-rl',
}

export const option = {
  dataset: '我是文本',
  fontSize: 20,
  fontColor: '#ffffff',
  paddingX: 10,
  paddingY: 10,
  fontWeight: 400,

  // 边框
  borderWidth: 0,
  borderColor: '#ffffff',
  borderRadius: 5,

  // 字间距
  letterSpacing: 5,
  backgroundColor: '#00000000',

  // 动画时长
  animation: 5,
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  public key = TextAutoConfig.key
  public chartConfig = cloneDeep(TextAutoConfig)
  public option = cloneDeep(option)
}
