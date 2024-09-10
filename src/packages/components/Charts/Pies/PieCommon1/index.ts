import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PieCommon1Config: ConfigType = {
  key: 'PieCommon1',
  chartKey: 'VPieCommon1',
  conKey: 'VCPieCommon1',
  title: '饼图-环形图',
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'PieCommon1.png'
}
