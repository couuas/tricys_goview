import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const GDMapConfig: ConfigType = {
  key: 'GDMap',
  chartKey: 'VGDMap',
  conKey: 'VCGDMap',
  // VCD开头
  conDataKey: 'VCDGDMap',
  title: '站点概况',
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'GDMap.png'
}
