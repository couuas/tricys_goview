import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '@/packages/components/CUSTOMCOMPONENTS/index.d'

export const Theme3Config: ConfigType = {
  key: 'Theme3',
  chartKey: 'VTheme3',
  conKey: 'VCTheme3',
  conDataKey: 'VCDTheme3',
  title: '背景3',
  // category: ChatCategoryEnum.THEMES,
  // categoryName: ChatCategoryEnumName.THEMES,
  // package: PackagesCategoryEnum.THEMESANDLAYOUTS,
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'theme3.png'
}
