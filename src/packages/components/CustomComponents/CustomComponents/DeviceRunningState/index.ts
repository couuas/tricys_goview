import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const DeviceRunningStateConfig: ConfigType = {
  key: 'DeviceRunningState',
  chartKey: 'VDeviceRunningState',
  conKey: 'VCDeviceRunningState',
  // VCD开头
  conDataKey: 'VCDDeviceRunningState',
  title: '设备运行状态',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'DeviceRunningState.png'
}
