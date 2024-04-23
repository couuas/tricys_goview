import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const ComprehensivePUEV3Config: ConfigType = {
  key: 'ComprehensivePUEV3',
  chartKey: 'VComprehensivePUEV3',
  conKey: 'VCComprehensivePUEV3',
  conDataKey: 'VCDComprehensivePUEV3',
  title: '综合PUE通用',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'ComprehensivePUE.png'
}
