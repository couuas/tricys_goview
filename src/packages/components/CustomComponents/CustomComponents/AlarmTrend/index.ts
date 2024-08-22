import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const AlarmTrend: ConfigType = {
  key: 'AlarmTrend',
  chartKey: 'VAlarmTrend',
  conKey: 'VCAlarmTrend',
  // VCD开头
  conDataKey: 'VCDAlarmTrend',
  title: '告警趋势',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'AlarmTrend.png'
}
