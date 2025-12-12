import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

import image from '@/assets/images/chart/charts/rank-chart.png'

export const RankChartConfig: ConfigType = {
  key: 'RankChart',
  chartKey: 'VRankChart',
  conKey: 'VCRankChart',
  title: '排行榜',
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: image,
}
