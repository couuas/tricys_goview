import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PieCommon3Config: ConfigType = {
  key: 'PieCommon3',
  chartKey: 'VPieCommon3',
  conKey: 'VCPieCommon3',
  title: '饼图-自定义',
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'PieCommon3.png'
}
