import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { BorderCustom2Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'
import { CurrentSourceEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

export const option = {
  // // 图片路径
  // dataset: '',
  // // 适应方式
  // fit: 'contain',
  // // 圆角
  // borderRadius: 0
  dataset: {status: 0}
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.commonData.currentSource = CurrentSourceEnum.SINGLEPOINT
  }
  public key = BorderCustom2Config.key
  public chartConfig = cloneDeep(BorderCustom2Config)
  public option = cloneDeep(option)
}
