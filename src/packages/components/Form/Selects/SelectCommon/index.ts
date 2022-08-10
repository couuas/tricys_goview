import { FormCategoryEnum, FormCategoryEnumName } from './../../index.d';
import { PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d';
import { getComponentConfig } from '@/utils/componets';

export const SelectCommonConfig = getComponentConfig({
    key: 'SelectCommon',
    title: '下拉框',
    category: FormCategoryEnum.SELECT,
    categoryName: FormCategoryEnumName.SELECT,
    package: PackagesCategoryEnum.FORM,
    chartFrame: ChartFrameEnum.COMMON
})

