import { CreateComponentType } from '@/packages/index.d';
import { publicConfig } from '@/packages/public/publicConfig';
import { InputCommonConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { COMPONENT_SIZE_ENUM } from '@/enums/componentEnum';

export const option = {
  // 参考 https://www.naiveui.com/zh-CN/os-theme/components/input
  inputOption: {
    clearable: true,
    maxlength: 20,
    placeholder: '',
    round: false,
    showCount: false,
    size: COMPONENT_SIZE_ENUM.MEDIUM
  }
}

export default class Config extends publicConfig implements CreateComponentType
{
  public key = InputCommonConfig.key
  public chartConfig = cloneDeep(InputCommonConfig)
  public option = cloneDeep(option)
}