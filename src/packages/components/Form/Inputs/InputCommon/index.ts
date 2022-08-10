import { FormCategoryEnum, FormCategoryEnumName } from './../../index.d';
import { PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d';
import { getComponentConfig } from '@/utils/componets';

export const InputCommonConfig = getComponentConfig({
    key: 'InputCommon',
    title: '输入框',
    category: FormCategoryEnum.INPUT,
    categoryName: FormCategoryEnumName.INPUT,
    package: PackagesCategoryEnum.FORM,
    chartFrame: ChartFrameEnum.COMMON
})

