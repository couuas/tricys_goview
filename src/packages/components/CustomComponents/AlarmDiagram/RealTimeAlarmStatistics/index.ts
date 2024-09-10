import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '@/packages/components/CUSTOMCOMPONENTS/index.d'

export const RealTimeAlarmStatisticsConfig: ConfigType = {
  key: 'RealTimeAlarmStatistics',
  chartKey: 'VRealTimeAlarmStatistics',
  conKey: 'VCRealTimeAlarmStatistics',
  conDataKey: 'VCDRealTimeAlarmStatistics',
  title: '实时告警统计',
  // category: ChatCategoryEnum.THEMES,
  // categoryName: ChatCategoryEnumName.THEMES,
  // package: PackagesCategoryEnum.THEMESANDLAYOUTS,
  category: ChatCategoryEnum.ALARMDIAGRAM,
  categoryName: ChatCategoryEnumName.ALARMDIAGRAM,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'RealTimeAlarmStatistics.png'
}
