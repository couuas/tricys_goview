import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const ClassifiedStatistic: ConfigType = {
  key: 'ClassifiedStatistic',
  chartKey: 'VClassifiedStatistic',
  conKey: 'VCClassifiedStatistic',
  // VCD开头
  conDataKey: 'VCDClassifiedStatistic',
  title: '分类统计',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'ClassifiedStatistic.png'
}
