import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const PowerCapacityConfig: ConfigType = {
  key: 'PowerCapacity',
  chartKey: 'VPowerCapacity',
  conKey: 'VCPowerCapacity',
  // VCD开头
  conDataKey: 'VCDPowerCapacity',
  title: '功率容量',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'PowerCapacity.png'
}
