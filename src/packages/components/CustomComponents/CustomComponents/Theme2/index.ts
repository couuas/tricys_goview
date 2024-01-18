import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '@/packages/components/CUSTOMCOMPONENTS/index.d'

export const Theme2Config: ConfigType = {
  key: 'Theme2',
  chartKey: 'VTheme2',
  conKey: 'VCTheme2',
  conDataKey: 'VCDTheme2',
  title: '背景2',
  // category: ChatCategoryEnum.THEMES,
  // categoryName: ChatCategoryEnumName.THEMES,
  // package: PackagesCategoryEnum.THEMESANDLAYOUTS,
  category: ChatCategoryEnum.CUSTOMCOMPONENTS,
  categoryName: ChatCategoryEnumName.CUSTOMCOMPONENTS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'theme2.png'
}
