import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const AlarmLevelStatistic: ConfigType = {
  key: 'AlarmLevelStatistic',
  chartKey: 'VAlarmLevelStatistic',
  conKey: 'VCAlarmLevelStatistic',
  // VCD开头
  conDataKey: 'VCDAlarmLevelStatistic',
  title: '告警数统计',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'AlarmLevelStatistic.png'
}
