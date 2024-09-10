import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const EngineeringConfig: ConfigType = {
  key: 'EngineeringConfig',
  chartKey: 'VEngineeringConfig',
  conKey: 'VCEngineeringConfig',
  // VCD开头
  conDataKey: 'VCDEngineeringConfig',
  title: '工程组态',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'EngineeringConfig.png'
}
