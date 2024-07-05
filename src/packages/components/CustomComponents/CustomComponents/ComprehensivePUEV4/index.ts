import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const ComprehensivePUEV4Config: ConfigType = {
  key: 'ComprehensivePUEV4',
  chartKey: 'VComprehensivePUEV4',
  conKey: 'VCComprehensivePUEV4',
  conDataKey: 'VCDComprehensivePUEV4',
  title: '综合PUE通用1',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'ComprehensivePUE1.png'
}
