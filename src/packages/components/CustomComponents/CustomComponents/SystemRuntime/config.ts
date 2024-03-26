import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { SystemRuntimeConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {

}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.attr.w = 500
    this.attr.h = 150
  }
  public key = SystemRuntimeConfig.key
  public chartConfig = cloneDeep(SystemRuntimeConfig)
  public option = cloneDeep(option)
}
