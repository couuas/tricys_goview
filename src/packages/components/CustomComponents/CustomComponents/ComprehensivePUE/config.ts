import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ComprehensivePUEConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

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
  public key = ComprehensivePUEConfig.key
  public chartConfig = cloneDeep(ComprehensivePUEConfig)
  public option = cloneDeep(option)
}
