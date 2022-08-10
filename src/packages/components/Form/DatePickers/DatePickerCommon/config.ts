import { CreateComponentType } from '@/packages/index.d';
import { publicConfig } from '@/packages/public/publicConfig';
import { DatePickerCommonConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
}

export default class Config extends publicConfig implements CreateComponentType
{
  public key = DatePickerCommonConfig.key
  public chartConfig = cloneDeep(DatePickerCommonConfig)
  public option = cloneDeep(option)
}