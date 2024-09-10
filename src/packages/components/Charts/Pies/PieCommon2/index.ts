import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PieCommon2Config: ConfigType = {
  key: 'PieCommon2',
  chartKey: 'VPieCommon2',
  conKey: 'VCPieCommon2',
  title: '饼图-玫瑰图',
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'PieCommon2.png'
}
