import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const OverviewOfComputingNodesConfig: ConfigType = {
  key: 'OverviewOfComputingNodes',
  chartKey: 'VOverviewOfComputingNodes',
  conKey: 'VCOverviewOfComputingNodes',
  // VCD开头
  conDataKey: 'VCDOverviewOfComputingNodes',
  title: '计算节点运行概况',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'OverviewOfComputingNodes.png'
}
