import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Theme3Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import background from '@/assets/customComponents/theme1/backgrond.jpg'

export const option = {
  // 图片路径
  dataset: '',
  // 适应方式
  fit: 'contain',
  // 圆角
  borderRadius: 0
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.attr = {
      ...this.attr,
      w: 1920,
      h: 1080,
      x: 0,
      y: 0,
    }
  }
  public key = Theme3Config.key
  public chartConfig = cloneDeep(Theme3Config)
  public option = cloneDeep(option)
  public customData = cloneDeep({
    title: '',
  })
}
