import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/Decorates/index.d'

export const BorderCustom1Config: ConfigType = {
  key: 'BorderCustom1',
  chartKey: 'VBorderCustom1',
  conKey: 'VCBorderCustom1',
  conDataKey: 'VCDBorderCustom1',
  title: '边框-自定义1',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'BorderCustom1.png'
}
