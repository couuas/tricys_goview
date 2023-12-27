import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Theme1Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import bakground from '@/assets/customComponents/theme1/backgrond.jpg'

export const option = {
  // 图片路径
  dataset: bakground,
  // 适应方式
  fit: 'contain',
  // 圆角
  borderRadius: 0
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  public key = Theme1Config.key
  public chartConfig = cloneDeep(Theme1Config)
  public option = cloneDeep(option)
}
