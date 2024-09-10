import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '@/packages/components/CustomComponents/index.d'

export const BackgroundsConfig: ConfigType = {
  key: 'Backgrounds',
  chartKey: 'VBackgrounds',
  conKey: 'VCBackgrounds',
  title: '背景',
  category: ChatCategoryEnum.BACKGROUNDS,
  categoryName: ChatCategoryEnumName.BACKGROUNDS,
  package: PackagesCategoryEnum.CUSTOMCOMPONENTS,
  chartFrame: ChartFrameEnum.STATIC,
  image: ''
}
