import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '@/packages/components/ThemesAndLayouts/index.d'

export const Theme1Config: ConfigType = {
  key: 'Theme1',
  chartKey: 'VTheme1',
  conKey: 'VCTheme1',
  title: '主题1',
  category: ChatCategoryEnum.THEMES,
  categoryName: ChatCategoryEnumName.THEMES,
  package: PackagesCategoryEnum.THEMESANDLAYOUTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'theme1.png'
}
