import image from '@/assets/images/chart/charts/bar_x.png'
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { getComponentConfig } from '@/utils'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { config } from './enum'

export const BarCommonConfig: ConfigType = getComponentConfig({
  ...config,
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image
})
