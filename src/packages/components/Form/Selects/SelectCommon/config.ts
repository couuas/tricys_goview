import { CreateComponentType } from '@/packages/index.d';
import { publicConfig } from '@/packages/public/publicConfig';
import { SelectCommonConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
}

export default class Config extends publicConfig implements CreateComponentType
{
  public key = SelectCommonConfig.key
  public chartConfig = cloneDeep(SelectCommonConfig)
  public option = cloneDeep(option)
}