import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'


export const AirConditioningTableConfig: ConfigType = {
  key: 'AirConditioningTable',
  chartKey: 'VAirConditioningTable',
  conKey: 'VCAirConditioningTable',
  conDataKey: 'VCDAirConditioningTable',
  title: '空调可视化表格',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'tables_basic.png'
}
