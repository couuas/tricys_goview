import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const ElectricityConsumptionConfig: ConfigType = {
  key: 'ElectricityConsumption',
  chartKey: 'VElectricityConsumption',
  conKey: 'VCElectricityConsumption',
  // VCD开头
  conDataKey: 'VCDElectricityConsumption',
  title: '用电量',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'ElectricityConsumption.png'
}
