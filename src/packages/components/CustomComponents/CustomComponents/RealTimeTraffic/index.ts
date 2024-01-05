import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const RealTimeTrafficConfig: ConfigType = {
  key: 'RealTimeTraffic',
  chartKey: 'VRealTimeTraffic',
  conKey: 'VCRealTimeTraffic',
  // VCD开头
  conDataKey: 'VCDRealTimeTraffic',
  title: '采集流量实时监测',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'RealTimeTraffic.png'
}
