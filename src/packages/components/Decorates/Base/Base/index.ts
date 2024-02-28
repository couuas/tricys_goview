import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '@/packages/components/Decorates/index.d'

export const BaseConfig: ConfigType = {
  key: 'Base',
  chartKey: 'VBase',
  conKey: 'VCBase',
  title: '底座',
  category: ChatCategoryEnum.BASE,
  categoryName: ChatCategoryEnumName.BASE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: ''
}
