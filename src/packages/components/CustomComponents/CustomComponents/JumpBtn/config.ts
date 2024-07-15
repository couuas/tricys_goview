import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { JumpBtnConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'

export const option = {}
export const customData = {
  label: '1号楼',
  id: null,
  id1: null,
  showInterval: true,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  constructor() {
    super();
    this.attr.w = 100
    this.attr.h = 40
    this.request.requestInterval = 15
  }
  public key = JumpBtnConfig.key
  public chartConfig = cloneDeep(JumpBtnConfig)
  public option = cloneDeep(option)
  public customData = cloneDeep(customData)
}
