import image from '@/assets/images/chart/informations/text_static.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TextAutoConfig: ConfigType = {
  key: 'TextAuto',
  chartKey: 'VTextAuto',
  conKey: 'VCTextAuto',
  title: '滚动文字',
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: PackagesCategoryEnum.INFORMATIONS,
  image
}
