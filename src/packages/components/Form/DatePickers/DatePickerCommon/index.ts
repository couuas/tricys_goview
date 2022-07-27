import { FormCategoryEnum, FormCategoryEnumName } from '../../index.d';
import { PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d';
import { getComponentConfig } from '@/utils/componets';

export const DatePickerCommonConfig = getComponentConfig({
    key: 'DatePickerCommon',
    title: '日期选择',
    category: FormCategoryEnum.DATE_PICKER,
    categoryName: FormCategoryEnumName.DATE_PICKER,
    package: PackagesCategoryEnum.FORM,
    chartFrame: ChartFrameEnum.COMMON
})

