import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const ComprehensivePUEV2Config: ConfigType = {
  key: 'ComprehensivePUEV2',
  chartKey: 'VComprehensivePUEV2',
  conKey: 'VCComprehensivePUEV2',
  conDataKey: 'VCDComprehensivePUEV2',
  title: '综合PUE通用',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'ComprehensivePUE.png'
}
