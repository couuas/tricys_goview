import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const SiteStatisticsConfig: ConfigType = {
  key: 'SiteStatistics',
  chartKey: 'VSiteStatistics',
  conKey: 'VCSiteStatistics',
  // VCD开头
  conDataKey: 'VCDSiteStatistics',
  title: '站点统计',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'SiteStatistics.png'
}
