import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const RealTimeEventConfig: ConfigType = {
  key: 'RealTimeEvent',
  chartKey: 'VRealTimeEvent',
  conKey: 'VCRealTimeEvent',
  // VCD开头
  conDataKey: 'VCDRealTimeEvent',
  title: '实时事件',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'RealTimeEvent.png'
}
