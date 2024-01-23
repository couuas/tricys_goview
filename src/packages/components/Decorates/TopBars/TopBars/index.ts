import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '@/packages/components/Decorates/index.d'

export const TopBarsConfig: ConfigType = {
  key: 'TopBars',
  chartKey: 'VTopBars',
  conKey: 'VCTopBars',
  title: '顶栏',
  category: ChatCategoryEnum.TOPBARS,
  categoryName: ChatCategoryEnumName.TOPBARS,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: ''
}
