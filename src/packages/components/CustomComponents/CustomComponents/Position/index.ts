import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const PositionConfig: ConfigType = {
  key: 'Position',
  chartKey: 'VPosition',
  conKey: 'VCPosition',
  // VCD开头
  conDataKey: 'VCDPosition',
  title: '告警定位',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'Position.png'
}
