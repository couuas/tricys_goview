import { dataComponentEventMap } from '@/enums/eventEnum';
import { OptionsType } from '@/packages/index.d';
import { mapToOptions } from '@/utils';

//内置方法
export const methodList = mapToOptions(dataComponentEventMap) as Array<OptionsType>

export const config = {
  key: 'BarCommon',
  title: '柱状图',
  methodList
} 

