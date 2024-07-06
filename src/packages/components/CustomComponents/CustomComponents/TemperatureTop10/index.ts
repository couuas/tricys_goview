import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const TemperatureTop10Config: ConfigType = {
  key: 'TemperatureTop10',
  chartKey: 'VTemperatureTop10',
  conKey: 'VCTemperatureTop10',
  // VCD开头
  conDataKey: 'VCDTemperatureTop10',
  title: '区域温度TOP10',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'TemperatureTop10.png'
}
