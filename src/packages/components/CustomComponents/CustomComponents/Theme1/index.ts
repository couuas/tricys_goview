import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '@/packages/components/CUSTOMCOMPONENTS/index.d'

export const Theme1Config: ConfigType = {
  key: 'Theme1',
  chartKey: 'VTheme1',
  conKey: 'VCTheme1',
  conDataKey: 'VCDTheme1',
  title: '背景1',
  // category: ChatCategoryEnum.THEMES,
  // categoryName: ChatCategoryEnumName.THEMES,
  // package: PackagesCategoryEnum.THEMESANDLAYOUTS,
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'theme1.png'
}
