import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const DeviceAlarmOverviewConfig: ConfigType = {
  key: 'DeviceAlarmOverview',
  chartKey: 'VDeviceAlarmOverview',
  conKey: 'VCDeviceAlarmOverview',
  conDataKey: 'VCDDeviceAlarmOverview',
  title: '当前设备告警概况',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'DeviceAlarmOverview.png'
}
