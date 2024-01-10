import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const MonitorRealTimeEventsConfig: ConfigType = {
  key: 'MonitorRealTimeEvents',
  chartKey: 'VMonitorRealTimeEvents',
  conKey: 'VCMonitorRealTimeEvents',
  // VCD开头
  conDataKey: 'VCDMonitorRealTimeEvents',
  title: '自监控实时事件',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'MonitorRealTimeEvents.png'
}
