import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const DashboardConfig: ConfigType = {
  key: 'Dashboard',
  chartKey: 'VDashboard',
  conKey: 'VCDashboard',
  title: '仪表盘',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'Dashboard.png'
}
