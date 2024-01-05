import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const ComprehensivePUEConfig: ConfigType = {
  key: 'ComprehensivePUE',
  chartKey: 'VComprehensivePUE',
  conKey: 'VCComprehensivePUE',
  conDataKey: 'VCDComprehensivePUE',
  title: '综合PUE',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'ComprehensivePUE.png'
}
