import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/Decorates/index.d'

export const BorderCustom2Config: ConfigType = {
  key: 'BorderCustom2',
  chartKey: 'VBorderCustom2',
  conKey: 'VCBorderCustom2',
  // conDataKey: 'VCDBorderCustom2',
  title: '边框-自定义2',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'BorderCustom1.png'
}
