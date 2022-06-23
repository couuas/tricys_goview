import image from '@/assets/images/chart/charts/pie-circle.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const GaugeRingConfig: ConfigType = {
  key: 'GaugeRing',
  chartKey: 'VGaugeRing',
  conKey: 'VCGaugeRing',
  title: '仪表盘-圆环',
  category: ChatCategoryEnum.GAUGE,
  categoryName: ChatCategoryEnumName.GAUGE,
  package: PackagesCategoryEnum.CHARTS,
  image
}
