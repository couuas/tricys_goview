import { CreateComponentType } from '@/packages/index.d';
import { publicConfig } from '@/packages/public/publicConfig';
import { ComponentConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
}

export default class Config extends publicConfig implements CreateComponentType
{
  public key = ComponentConfig.key
  public chartConfig = cloneDeep(ComponentConfig)
  public option = cloneDeep(option)
}