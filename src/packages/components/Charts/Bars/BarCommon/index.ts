import image from '@/assets/images/chart/charts/bar_x.png'
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { getComponentConfig } from '@/utils'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const BarCommonConfig: ConfigType = getComponentConfig({
  key: 'BarCommon',
  title: '柱状图',
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image
})
