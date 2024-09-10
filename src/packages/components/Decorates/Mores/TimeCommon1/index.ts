import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TimeCommon1Config: ConfigType = {
  key: 'TimeCommon1',
  chartKey: 'VTimeCommon1',
  conKey: 'VCTimeCommon1',
  title: '通用时间1',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'TimeCommon1.png'
}
