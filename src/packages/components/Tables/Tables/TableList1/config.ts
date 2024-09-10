import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TableList1Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
// import logo from '@/assets/logo.png'
export enum AlignEnum {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}
export const option = {

  // // 图片路径
  // dataset: '',
  // // 适应方式
  // fit: 'contain',
  // // 圆角
  // borderRadius: 0
  dataset: {
    "dimensions": ['分类名','top1','top2','top3'],
    "source": []
  },
  timeout: 3000
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  constructor() {
    super();
    this.request.requestInterval = 15
  }
  public key = TableList1Config.key
  public chartConfig = cloneDeep(TableList1Config)
  public option = cloneDeep(option)
  // public customData = cloneDeep({
  //   showInterval: true,
  // })
}
